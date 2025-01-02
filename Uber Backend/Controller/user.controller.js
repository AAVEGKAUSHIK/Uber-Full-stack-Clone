import userModel from "../Models/user.model";
import { validationResult } from "express-validator";

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { FullName, Email, Password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({Email});

    if(isUserAlreadyExists){
        return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const hashPassword = await userModel.hashPassword(Password);

    const user = await userModel.create({
        FirstName : FullName.FirstName,
        LastName : FullName.LastName,
        Email,
        Password: hashPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
};

export default { registerUser };