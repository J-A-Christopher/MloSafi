import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter";
import connectDB from "./connections/userDB";
import bodyParser from "body-parser";
import cors from "cors";
import { errorHandler } from "./middleware/errorMiddleware";
import userRouter from "./routes/userRoutes";
import foodRouter from "./routes/foodroutes";


const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000 ");
});
app.use(
  cors({
    credentials: true,
  })
);

app.use(authRouter);
app.use(userRouter);
app.use(foodRouter);
app.use(errorHandler);
