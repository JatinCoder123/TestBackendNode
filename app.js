import express from "express";
import cors from "cors";
import "express-async-errors";
import candidateRoutes from "./routes/candidate.routes.js";
import roleRoutes from "./routes/roles.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


/* ======================
   Routes
====================== */
app.use("/api/candidates", candidateRoutes);
app.use("/api/roles", roleRoutes);

/* ======================
   Error Handling
====================== */
// app.use(notFound);
// app.use(errorHandler);

export default app;
