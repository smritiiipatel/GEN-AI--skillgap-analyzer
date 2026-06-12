import './src/config/env.js'
import connectDB from './src/config/database.js';
import app from "./src/app.js";

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})