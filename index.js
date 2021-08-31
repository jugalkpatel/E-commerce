const express = require("express");

const app = express();

const cors = require("cors");

require("dotenv").config();

const { getConnection } = require("./connections/mongoose.connection");

const { productRouter } = require("./routes/product.route");
const { specRouter } = require("./routes/specifications.route");
const { userRouter } = require("./routes/user.route");
const { manufacturerRouter } = require("./routes/manufacturers.route");

const PORT = process.env.PORT || 8000;

getConnection();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/products", productRouter);
app.use("/specs", specRouter);
app.use("/manufacturers", manufacturerRouter);

app.get("/", (req, res) => {
  res
    .status(201)
    .json({ success: true, message: "Welcome to backend for e-commerce" });
});

/**
 * 404 ROUTE: DO NOT REMOVE, SHOULD BE AT THE END
 */
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "no such endpoint" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    success: false,
    message: "something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
