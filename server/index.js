import app from './src/app.js'
import dbconection from './src/config/db.js'
import dotenv from "dotenv"
dotenv.config();

const PORT= process.env.PORT||5000;

const startserver = async () => {
    
    try {
        await dbconection();

        app.listen(PORT,()=>{
            console.log(`server is runing port number ${PORT}`)
        })
        
    } catch (error) {
        
        console.log(error);
        process.exit(1);
    }
}

startserver();
