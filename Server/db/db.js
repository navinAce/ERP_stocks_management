import mysql2 from 'mysql2';

const connection = mysql2.createPool({
    host: 'b0oynhti3dmrn9dugkyb-mysql.services.clever-cloud.com',
    user: 'uaz00jqovdzmb5we',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
    waitForConnections: true, 
    connectionLimit: 10, 
    queueLimit: 0
    // enableKeepAlive: true, 
    // keepAliveInitialDelay: 10000 
});

// connection.connect((err) => {  ///no need for createPool, only need for createConnection
//     if (err) {
//         console.error('Error connecting to the database:', err.stack);
//         return;
//     }
//     console.log('Connected to the MySQL server');
// });


export default connection.promise();