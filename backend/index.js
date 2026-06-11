import './src/congif/env.js'
import connectDB from './src/congif/database.js';
import app from "./src/app.js";


connectDB();


app.listen(3000,()=>{
    console.log("server is running");

    
})