require("dotenv").config();
const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const gamesRouter = require("./routes/gamesRouter");
const genresRouter = require("./routes/genresRouter");
const devsRouter = require("./routes/devRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/games", gamesRouter);
app.use("/genres", genresRouter);
app.use("/devs", devsRouter);
app.use((req, res, next) => {
	res.status(404).send("404: Page not found");
});
app.use((error,req, res, next) => {
	console.error(error.stack);
	res.status(500).send("Something went wrong, please, try at another time");
});

const PORT = process.env.PORT = 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
