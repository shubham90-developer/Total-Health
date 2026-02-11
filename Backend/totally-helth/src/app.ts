<<<<<<< HEAD
import express, {Application, Request,Response} from 'express';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { setupSwagger } from './app/config/swagger';
import { globalAccessControl } from './app/middlewares/globalAccessControl';
const app:Application = express();
import cors from 'cors';

// parsers
app.use(express.json());
app.use(cors())
=======
import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import { setupSwagger } from "./app/config/swagger";
import { globalAccessControl } from "./app/middlewares/globalAccessControl";
const app: Application = express();
import cors from "cors";

// parsers
app.use(express.json());
app.use(cors());
>>>>>>> origin/main

// swagger configuration
setupSwagger(app);

// Global access control - applies to all routes
app.use(globalAccessControl());
<<<<<<< HEAD

// application routes
app.use('/v1/api', router)

const entryRoute = (req:Request, res:Response)=>{
    const message = 'Surver is running...';
    res.send(message)
}

app.get('/', entryRoute)
=======
app.use((req, res, next) => {
  console.log("REQ:", req.method, req.originalUrl);
  next();
});
// application routes
app.use("/v1/api", router);

const entryRoute = (req: Request, res: Response) => {
  const message = "Surver is running...";
  res.send(message);
};

app.get("/", entryRoute);
>>>>>>> origin/main

//Not Found
app.use(notFound);

app.use(globalErrorHandler);

<<<<<<< HEAD
export default app;
=======
export default app;
>>>>>>> origin/main
