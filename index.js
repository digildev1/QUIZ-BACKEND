const express = require('express');
const app = express();
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const apicache = require("apicache");






// Middleware (INBUILT);
app.use(cors());
app.use(express.json());
dotenv.config();



// Mongodb Connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const conn = mongoose.connection;

conn.once('open', () => {
  console.log("Mongoose connection is done");
})


app.get('/', (req, res) => {
  return res.send(" <p>QUIZ's Backend</p>")
})

const QuizRoutes = require("./routes/Quiz");
const MrRotues = require("./routes/Mr");
const AdminRoutes = require("./routes/admin")
app.use('/api', QuizRoutes);
app.use('/api', MrRotues);
app.use("/api", AdminRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server is running At", port);
})
