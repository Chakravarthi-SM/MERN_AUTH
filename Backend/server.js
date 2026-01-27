import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();
import cors from "cors";
// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))


// Middleware to handle routes
/*
 every request from the client passes through this Middleware
 and if the request URL starts with /user , it wil be
  directed to userRoute for further processing.
*/
app.use('/user', userRoute)

app.get('/', (req, res) => {
  res.send("This is Home Page");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
