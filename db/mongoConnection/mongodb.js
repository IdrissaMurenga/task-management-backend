import mongoose from "mongoose";

export const mongoDBconnect = (app) => {
    const mongodb_url = process.env.MONGODB_URL

    // Connect to MongoDB
    mongoose.connect(mongodb_url)
        .then(() => {
            const port = process.env.PORT
            app.listen(port,() => console.log(`Server is running at http://localhost:${port}......`))
        })
        .catch(error => console.error("MongoDB connection error:", error));
}
