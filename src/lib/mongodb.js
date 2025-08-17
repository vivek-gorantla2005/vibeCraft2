import mongoose from "mongoose"

export default async function connectDB() {
    try{
        console.log("connecting to database...")
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connected to database!");
    }catch(err){
        console.log("error connecting to database",err);
    }
}