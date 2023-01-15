const express = require('express');//framework
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');//for error handling
const cors = require('cors');// for making requests from website to another
const morgan = require('morgan');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.raw({type: 'application/xml'}));

app.use(cors());

app.use(morgan('dev'));

app.use(errorHandler());

const routerAPI = require('./routes/api');

app.use('/api',routerAPI);

const  PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`server is running http://localhost:${PORT}`);
});
module.exports = app;

