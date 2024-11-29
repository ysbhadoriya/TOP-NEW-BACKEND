require("dotenv").config()

const express = require("express");
const cors = require("cors")
const app = express();
const authRoute = require("./router/auth-router");
const serviceRoute =require("./router/service-router")
const contactRoute = require ("./router/contact-router")
const connectDb = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware")

const  corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET , PUT , POST , PATCH , DELETE" , 
    credentials : true ,
}


app.use(cors(corsOptions))

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute)
app.use("/api/data" , serviceRoute)

app.use(errorMiddleware)

// Start the server after the database is connected
connectDb().then(() => {
    const PORT = 5000 ; // Fallback to 5000 if PORT is not defined
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.log("Failed to connect to the database:", err);
});