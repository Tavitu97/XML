const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'happy_internet'
});
dbConnection.connect((error) => {
    if(error) {
        console.log(error + " error connecting");
    } else {
        console.log("Connection successful");
    }
});
module.exports = dbConnection;