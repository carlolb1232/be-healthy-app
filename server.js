const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

require('./server/config/mongoose.config')

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./server/routes/user.routes')(app); 
require('./server/routes/excercise.routes')(app); 
require('./server/routes/food.routes')(app); 
require('./server/routes/period.routes')(app); 
require('./server/routes/rutine.routes')(app); 

app.listen(8000, () => {
    console.log("Servidor Conectado")
})