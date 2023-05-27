const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./Config/db").connectDb();

const userRoute = require("./Routes/user")
const blogRoute = require("./Routes/Blog")

const PORT = process.env.PORT || 4000;

const app = express();
//normal middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CORS
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))


app.use("/api/v1",[userRoute,blogRoute]);

app.get("/", (req, res) => {
    res.status(200).send("Welcome Dude!");
});

app.listen(PORT, () => {
    console.log(`Server is Started At Port ${PORT}`);
});
