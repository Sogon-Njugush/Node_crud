const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mySqlPool = require('./config/db')

// configure dotenv
dotenv.config();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());


//routes
app.use('/api/user', require('./routes/userRoutes'))

app.get('/test',(req, res)=>{
    res.status(200).send("Welcome to pure love");
})
//port
const PORT = process.env.PORT || 8800;

//contidionaly listen
mySqlPool.query('SELECT 1').then(()=>{
    //mysql
    console.log('MYSQL DB Connected')
    //listen
    app.listen(PORT, ()=>{
        console.log(`server Running on ${process.env.PORT}`);
    })
}).catch((error)=>{
console.log(error)
})


