import mysql from'mysql';
import express from 'express';
// import { Sequelize } from 'sequelize';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 8000;
// for solving the cross origin problem
app.use(cors())
// parsing the incoming request to json  encoding
app.use(express.json());

const db=mysql.createConnection({
    host:'localhost',
    user:'root', 
    password:'Abbasjan123@',
    database:'appointment'
})

app.get("/test", (req, res) => {
    const listData = [
        {
            id: 1,
            name: "ali",
            age: 23,
        },
        {
            id: 2,
            name: "ahmad",
            age: 25,
        },
        {
            id: 3,
            name: "Kamran",
            age: 33,
        },
    ];
    res.status(200).json(listData);
})

// // starting point
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});


// const sequelize = new Sequelize('appointment', 'root', 'Abbasjan123@', {
//     dialect:'mysql',
//     host:'localhost'})
//     module.exports=sequelize;