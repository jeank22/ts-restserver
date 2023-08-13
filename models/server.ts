import express, { Application } from 'express';
import userRoutes from '../routes/user';
import cors from 'cors'
import db from '../db/connection';

class Server{
    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';
        //init methods
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    // #TODO Connect to DB
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            // throw new Error(error);
            
        }
    }

    middlewares() {
        // CORS
        this.app.use(cors());
        //READ BODY
        this.app.use(express.json());
        //PUBLIC DIR
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.apiPaths.users, userRoutes)
    }

    listen() {
        this.app.listen( this.port, () =>{
            console.log('Servidor corriendo en puerto ' + this.port)
        })
    }
}

export default Server;