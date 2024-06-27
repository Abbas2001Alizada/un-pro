import User from "../Models/user.js";
import upload from "../middleware/upload.js";
import fs from 'fs'



// export const uploadUserImage = async (req, res) => {
//   try {
//     const { name, username, email, password } = req.body;
//     const image = req.file.buffer;
//     await User.create({ name, username, email, password, image });
//     res.json({ "message": 'Image uploaded...' });
//   } catch (err) {
//     res.status(500).json(err.message);
//   }
// };




// Authenticate user based on username and password
export const authenticateUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      attributes: ['id','role'],
      where: { username, password },
    });

    if (!user) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    res.json({ userId: user.id, userRole:user.role });
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Server error' });
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


export const createUser = async (req, res) => {
  try {
    const { name, username, password, image, email, role } = req.body;
    const user = await User.create({ name, username, password, image, email,role });
    res.status(201).json(user);
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
