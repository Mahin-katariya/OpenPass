import type {Express} from 'express'
import express from 'express'
import { errorHandler } from './middleware/error-handler.js';
import type {Request, Response} from 'express'
export const app: Express = express();
import APIError from './utils/APIErrors.js';
import type { REPLCommand } from 'node:repl';
app.use(express.json());

// test routes
// app.get('/notfound', (req: Request,res: Response) => {
//     throw APIError.notFoundError("FORBIDDEN")
// })

// app.get('/err', (req: Request, res: Response) => {
//     throw Error;
// })

app.get('/',(req,res) => {
    res.send("Authentication server");
})

app.use(errorHandler);
