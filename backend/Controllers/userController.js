import User from "../Models/user.js";
import fs from 'fs'
import bcrypt from 'bcrypt';


// Authenticate user based on username and password
export const authenticateUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({
      attributes: ['id', 'password', 'role'],
      where: { username },
    });

    // If user not found, return an error
    if (!user) {
      return res.status(404).json({ error: 'اطلاعات ورود نامعتبر است' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is invalid, return an error
    if (!isPasswordValid) {
      return res.status(404).json({ error: 'اطلاعات ورود نامعتبر است' });
    }

    // If authentication is successful, return the user ID and role
    res.json({ userId: user.id, userRole: user.role });
  } catch (error) {
    console.error('خطا در احراز هویت:', error);
    res.status(500).json({ error: 'خطای سرور' });
  }
};
// Controller function to create a new user
export const createUser = async (req, res) => {
  const {name, username, password, email, role } = req.body;

  // Basic validation
  if (!name || !username || !password || !email || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  if (role !== 'کاربر' && role !== 'مدیر') {
    return res.status(400).json({ error: 'Role must be either user or admin' });
  }

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 6);

    // Create the new user record
    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
      email,
      role
    });

    // Send success response
    res.status(201).json({ message: 'User created successfully!', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'An error occurred while creating the user' });
  }
};

// Fetch user details by ID
export const getUserDetails = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId, {
      attributes: ['name', 'username', 'password', 'email', 'image','role'],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateUser = async (req, res) => {

  const { name, username, password, email, } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const user = await User.findByPk(req.params.id);
   
    if (image) {
      if (fs.existsSync(`uploads/${user.image}`)) {
        fs.unlinkSync(`uploads/${user.image}`);
      }
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name;
    user.username = username;
    if (password) {
      user.password = password; // Ensure to hash the password before saving
    }
    user.email = email;
    if (image) {
      user.image = image;
    }

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
  // });
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
