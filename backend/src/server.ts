import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routers/auth";
import pollsRouter from "./routers/polls";
import usersRouter from "./routers/users";
import candidatesRouter from "./routers/candidate";
import insertUserRouter from "./controllers/users/insertuser";
import { searchUserByCitizenshipNumber } from "./controllers/users/searchuser";
import { updateUserHandler } from "./controllers/users/updateuser";
import insertCandidatesRouter from "./controllers/candidate/insertcandidate";

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/polls", pollsRouter);
app.use("/users", usersRouter);
app.use(insertUserRouter);
app.use(updateUserHandler);
app.use(searchUserByCitizenshipNumber);
app.use("/api", candidatesRouter);
app.use(insertCandidatesRouter); // Add insertCandidatesRouter here
// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.get("/", (req: Request, res: Response) => {
  console.log(req.cookies);
  res.status(404).send("no link matched!");
});

export default app;
