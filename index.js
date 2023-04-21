import express from "express";
import session from "express-session";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import homepageRouter from "./routes/homepageRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRoutes.js";
import administrationRouter from "./routes/administrationRoutes.js";
import userRouter from "./routes/userRoutes.js";
import bodyParser from "body-parser";


// Configuration dotenv
dotenv.config();

// Configuration dotenv
//dotenv.config();

const __dirname = path.resolve();

// Create express App
const app = express();

app.use(session({
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        secure: false,
    }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à la base de données
connectDB();

// Set views engine
app.set("view engine", "ejs");

// Set views directory
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/bootstrap-icons'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/scss'));

app.use(homepageRouter);
app.use(categoryRouter);
app.use(productRouter);
app.use(administrationRouter);
app.use(userRouter);

// Create server and Listenning
app.listen(8082, () => {
    console.log("Server is listenning at port 8082");
});