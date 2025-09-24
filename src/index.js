import express from "express";
import handlebars from "express-handlebars";
import routes from "./routes.js";

const app = express();

// Setup handlebars
app.engine("hbs", handlebars.engine({
    extname: "hbs",
}));

app.set("view engine", "hbs");
app.set("views", "src/views");

// Setup static files
app.use(express.static("src/public"));

// Parse form data from requests
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(routes);

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
