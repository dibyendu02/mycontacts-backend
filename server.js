const express = require('express');
const { errorHandler } = require('./middlewares/errorHandler');
const { connectDB } = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cors = require('cors')



//database connection
connectDB();

const app = express();

const port =  process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes") )
app.use("/api/user", require("./routes/userRoutes") )
app.use(errorHandler);

app.listen(port, () => {
    console.log("server is running on port " + port);
})
