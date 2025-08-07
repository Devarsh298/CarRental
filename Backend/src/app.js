import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import sellerRouter from "./routes/seller.routes.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.routes.js";
import emailRouter from "./routes/email.routes.js";

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// routes
app.use("/api/users", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product",productRouter);
app.use("/api/order",orderRouter);
app.use("/api/email",emailRouter)


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
    data: null,
  });
});

// app.use("/", (req, res) => {
//   res.send("API is working");
// });


export { app };
