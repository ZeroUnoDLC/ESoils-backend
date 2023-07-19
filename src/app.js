import express from 'express';
import morgan from "morgan";
//import cors from "cors";
import homeRoutes from "./routes/home.routes.js";

import bodyParser from 'body-parser';

const app = express();


// configuraciones 

// const isProduction = process.env.NODE_ENV === 'production';
// if (isProduction) {
//   app.set('url', 'https://esoils.azurewebsites.net');
// } else {
//   app.set('port', process.env.PORT || 3000);
//   app.set('url', `http://localhost:${app.get('port')}`);
// }


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// middlewares
//app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// rutas
app.use(homeRoutes);
const port = 8080;
app.listen(port, () => { console.log("localhost:" + port) });
export default app;