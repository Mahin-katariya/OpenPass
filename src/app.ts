import type {Express} from 'express'
import express from 'express'
import type {Request, Response} from 'express'
import { errorHandler } from './middleware/error-handler.js';

import registerRoutes from './routes/register.routes.js'
import authRoutes from './routes/auth.routes.js'
import discoveryRoutes from './routes/discovery.routes.js'

export const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// test routes
// app.get('/notfound', (req: Request,res: Response) => {
//     throw APIError.notFoundError("FORBIDDEN")
// })

// app.get('/err', (req: Request, res: Response) => {
//     throw Error;
// })


app.get('/api/health',(req,res) => {
    res.send("Authentication server");
})

app.use('/api/register',registerRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/discovery', discoveryRoutes);
app.use(errorHandler);


