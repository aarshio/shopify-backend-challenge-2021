const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const middleware = require("./middleware/session");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

dotenv.config();

const PORT = process.env.PORT;
const URI = process.env.URI;

const app = express();

//Mongoose
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

//Middleware
app.use(middleware);

// Make uploads public
app.use("/uploads", express.static("uploads"));

// Routes
app.get("/", (req, res) => {
  res.send("Shopify back end challenge. Made with ❤️ by https://aarsh.io");
});
app.use(userRoutes);
app.use(postRoutes);

// start server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);

module.exports = app;
