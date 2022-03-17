import AuthorController from './app/controllers/AuthorController';
import { Server } from '@overnightjs/core';
import express from 'express';
import NewsController from './app/controllers/NewsController';

export class Application extends Server {
    constructor() {
        super(true);
        this.setupMiddlewares();
        this.setupControllers();
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server listening on port: ${port}`);
        });
    }

    private setupControllers(): void {
        super.addControllers([
            new NewsController(),
            new AuthorController(),
        ]);
    }

    private setupMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
}
