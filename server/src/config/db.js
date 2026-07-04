import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();


const dbconection = async () => {
    try {
        
        await mongoose.connect(process.env.DB_URL)

        console.log("database is conected");

    } catch (error) {
        console.log("ERROR: database is not conected");
        process.exit(1);
    }
}

export default dbconection;