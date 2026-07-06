import app from './src/app.js'
import dbconection from './src/config/db.js'
import dotenv from "dotenv"
import seedRole from './src/seeders/role.seeder.js';
dotenv.config();

const PORT= process.env.PORT||5000;


const startserver = async () => {
    
    try {
        
        await dbconection();
        
        await seedRole();

        app.listen(PORT,()=>{
            console.log(`server is runing port number ${PORT}`)
        })
        
    } catch (error) {
        
        console.log(error);
        process.exit(1);
    }
}

startserver();
