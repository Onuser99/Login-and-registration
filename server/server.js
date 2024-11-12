require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const adminRoute = require("./router/admin-router");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true,
};

app.use(cors(corsOptions));
const connectDB = require("./utils/db");

app.use(express.json());

app.use("/api/auth", router);



app.use("/api/admin", adminRoute)
const PORT = 5001;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at port : ${PORT}`);
    });
});




