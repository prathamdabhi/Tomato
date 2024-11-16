import mongoose from 'mongoose';



const connectDB = async () =>{
    try {
        mongoose.connection.on('connected',()=>{
            console.log('Database is connected')
        })
        const connectionString = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`)
        console.log('Database Name is',connectionString.connection.name)
        console.log('Database Host is',connectionString.connection.host)
        console.log('Database Connected Successfully')
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB