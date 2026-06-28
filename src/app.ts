import type {Express} from 'express'
import express from 'express'
import type {Request, Response} from 'express'
import { errorHandler } from './middleware/error-handler.js';

import registerRoutes from './routes/register.routes.js'

export const app: Express = express();
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

app.use('/api/auth/v1',registerRoutes);
app.use(errorHandler);
