import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";


import routes from "./routes.js";
import cookieParser from "cookie-parser";
import authMiddleware from "./middlewares/authMiddleware.js";

const app = express();

// Connect to MongoDB
const url = 'mongodb://localhost:27017';

try {
    await mongoose.connect(url, {
        dbName: "movie-magic-softuni",
    });

    console.log("Connected to MongoDB");
} catch (error) {
    console.error("Error connecting to MongoDB", error);
}

// Setup handlebars
app.engine("hbs", handlebars.engine({
    extname: "hbs",
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true, 
    }
}));

app.set("view engine", "hbs");
app.set("views", "src/views");

// Setup static files
app.use(express.static("src/public"));

// Parse form data from requests
app.use(express.urlencoded());

// Cookie parser
app.use(cookieParser());

// Auth middleware
app.use(authMiddleware);

// Routes
app.use(routes);

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
