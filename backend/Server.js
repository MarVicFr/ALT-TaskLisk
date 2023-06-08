const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routesTasks = require("./routes/TaskRoute")
const routesUsers = require("./routes/UserRoute")

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.json())
app.use(cors())

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log(`Connected to MongoDB`))
  .catch((err) => console.log(err))

app.use(routesTasks, routesUsers)


app.listen(PORT, () => console.log(`Listening on : ${PORT}`));
