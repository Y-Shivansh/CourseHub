import mongoose from "mongoose";


const connectToDB = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database Connected");
    } catch (error) {
        console.error("DB Connection Failed", error.message);
        process.exit(1);
    }
}

export default connectToDB;