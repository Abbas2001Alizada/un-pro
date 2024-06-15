import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRout from './routes/userRout.js';
import recordRout from './routes/recordsRout.js';
import childrenRout from './routes/childrenRout.js';
import appointmentRout from './routes/appointmentRout.js';
import sequelize from './dbconnection.js';
const port = 8038
const app = express()

app.get('/', (req, res) => {
    res.send('home page')
})
app.use(cors());
app.use(bodyParser.json())
app.use('/users', userRout)
app.use('/records',recordRout)
app.use('/children',childrenRout)
app.use('/appointment', appointmentRout)


// Sync database and start server
sequelize.sync({ alter: true }) // brings the neccessary changes to the table

  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });