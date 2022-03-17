import { Request, Response } from 'express';
import { ClassMiddleware, Controller, Delete, Get, Patch, Post } from '@overnightjs/core';
import { AuthorDto } from '../dtos/AuthorDto';
import authorService from '../services/authorService';
import cors from 'cors';

@Controller('authors')
@ClassMiddleware([cors()])
export default class AuthorController {
    @Post()
    async create(req: Request, res: Response) {
        res.status(201).json(await authorService.create({ name: req.body.name } as AuthorDto));
    }

    @Patch(':id')
    async update(req: Request, res: Response) {
        const { name } = req.body;

        const authorDto: Partial<AuthorDto> = {
            id: req.params.id,
            name,
        };

        res.json(await authorService.update(authorDto));
    }

    @Get()
    async list(req: Request, res: Response) {
        res.json(await authorService.list());
    }

    @Get(':id')
    async get(req: Request, res: Response) {
        res.json(await authorService.get(req.params.id));
    }

    @Delete(':id')
    async delete(req: Request, res: Response) {
        res.json(await authorService.delete(req.params.id));
    }
}
