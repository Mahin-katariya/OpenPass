import type { Request, Response } from "express";
import bcrypt from 'bcryptjs'

import APIError from "../utils/APIErrors.js";
import APIResponse from "../utils/APIResponse.js";
import { findUserByEmail, createUser } from "../services/user.services.js";

export async function registerUser(req: Request, res: Response){
    const {name, email, password} = req.body;

    // check if received the required data
    if(!name || !email || !password) throw APIError.badRequestError('MISSING_FIELDS');

    // check if user exists or not by calling findUserByEmail 
    const existing = findUserByEmail(email);
    if(existing) throw APIError.conflictError("EMAIL_ALREADY_EXISTS");

    // if does not exist we first hash the password andthen create the user by calling createUser
    const password_hash = await bcrypt.hash(password, 10);
    const user = createUser(name, email, password_hash);

    // send the response back to the client
    const response = new APIResponse(201, user,"USER_REGISTERED_SUCCESSFULLY");
    return res.status(response.statusCode).json(response);
}


