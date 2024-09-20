require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/indexRouter");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

const PORT = process.env.PORT = 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
