//require package management
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const body_parser = require('body-parser');
const Dev_Debug = require('debug')('dev');


//use middleware
const app = express();
app.use(express.json());
app.use(require('helmet')());
app.use(body_parser.json());

//Environment-based Development
//Dev_Debug(process.env.NODE_ENV); 



const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`server is connected ${port}`));