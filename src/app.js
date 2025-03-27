import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
    origin: process.env.COORS_ORIGIN,
    credentials: true
}));

// All middlewares are used as app.use()
app.use (express.json({limit: '16kb'})); //Limit is to prevent server overload

app.use(express.urlencoded({extended: true, limit: '16kb'})); //Limit is to prevent server overload
app.use(express.static('public')); // To serve static files from public folder
app.use(cookieParser()); // To parse cookies from request headers


// app.get('/', (req, res) => {
     
//     res.send('Hello World!');

// });

export default app;