import { Router } from "express";
import {body} from "express-validator";
const routes = Router();

routes.post("/register", [
    body("FullName").isLength({min: 3}).withMessage("Name should be atleast 3 characters long"),
    body("Email").isEmail().withMessage("Email is not valid"),
    body("Password").isLength({min: 5}).withMessage("Password should be atleast 5 characters long")
]);

export default routes;