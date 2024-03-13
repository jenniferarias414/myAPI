import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
config();
const SECRET = process.env.SECRET //The SECRET variable is assumed to hold the secret key used to sign and verify JWTs

// module.exports = {
export const isAuthenticated = (req, res, next) => {
        const headerToken = req.get('Authorization') //gets the token from the Authorization header (will see this in postman) of the incoming request

        if (!headerToken) { //if no token is found, an 'unauthorized' error is sent back
            console.log('ERROR IN auth middleware')
            res.sendStatus(401)
        }

        let token //declares a variable to store the decoded JWT

        try {
            token = jwt.verify(headerToken, SECRET) // attempts to verify the token using jwt.verify() with the provided SECRET
        } catch (err) { //If verification fails (due to an invalid or expired token)
            err.statusCode = 500 //, it catches the error, sets the status code to 500 (Internal Server Error)
            throw err
        }

        if (!token) { //If the token is not present or invalid
            const error = new Error('Not authenticated.') //, it creates a new Error object with a message "Not authenticated.", sets the status code to 401 (Unauthorized)
            error.statusCode = 401
            throw error
        }

        next() //if token is successfully verified, the middleware calls the next() function to pass control to the next middleware in the stack
    }