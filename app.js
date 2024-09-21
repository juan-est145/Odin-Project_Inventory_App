require("dotenv").config();
const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const gamesRouter = require("./routes/gamesRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/games", gamesRouter);

const PORT = process.env.PORT = 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
