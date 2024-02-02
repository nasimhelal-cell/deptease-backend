import mongoose from "mongoose";;

const connectDB = ()=>{
   return mongoose.connect(`${process.env.MONGO_URL}/deptease`)
}

export default connectDB