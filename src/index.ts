import express from "express";
import authRouter from "./routes/authRouter";
import connectDB from "./connections/userDB";
import bodyParser from "body-parser";
import cors from "cors";

// dotenv.config();
const app = express();
app.use(bodyParser.json());
//const port1 = process.env.PORT || 3030;
//console.log("port", port1);
connectDB();

app.listen(3000, () => {
  console.log('Server is running on port 3000 ');
});
app.use(
  cors({
    credentials: true,
  })
);

app.use(authRouter);
