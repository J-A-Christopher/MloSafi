import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter";
import connectDB from "./connections/userDB";
import bodyParser from "body-parser";
import cors from "cors";
import useragent from "express-useragent";
import { errorHandler } from "./middleware/errorMiddleware";
import userRouter from "./routes/userRoutes";
import foodRouter from "./routes/foodroutes";
import cartRoutes from "./routes/cart-rotes";
import orderRoutes from "./routes/order_routes";
import stkRoutes from "./routes/stkroutes";

const app = express();
app.use(useragent.express());
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
app.use(cartRoutes);
app.use(orderRoutes);
app.use(stkRoutes);
app.use(errorHandler);
