const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 5000;
const employeeRoute = require("./routes/employee");
const adminRoute = require("./routes/admin");

// middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect("mongodb://0.0.0.0:27017/employee_management", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("This api is working!!");
});

// Use admin routes
app.use("/api/admin", adminRoute);

//employee
app.use("/api/employees", employeeRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
