import Role from "../models/role.models.js";

const seedRole = async (req,res) => {

try {
    
    const count = await Role.countDocuments();

    if(count > 0)
    {
        return;
    }


     await Role.insertMany([
            { name: "Admin" },
            { name: "HR" },
            { name: "Manager" },
            { name: "Employee" }
        ]);

        console.log("default role created")
} catch (error) {
    
    console.log("role seeder error",error.message)
}


}

export default seedRole;