import dotenv from 'dotenv';
import app from './App.js';
import connection from '../db/db.js';

dotenv.config({ path: './.env' })


connection.on('error', (err) => {
    console.error('Error connecting to the database:', err.stack);
})

const PORT=process.env.PORT || 3000;

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})




