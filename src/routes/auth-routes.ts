import { Router } from "express";
import { signUp } from "../controllers/auth-controller";

const route = Router();

route.post("/sign-up", signUp);

export default route;
