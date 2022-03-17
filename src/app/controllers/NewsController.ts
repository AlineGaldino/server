import { Request, Response } from 'express';
import { ClassMiddleware, Controller, Delete, Get, Patch, Post } from '@overnightjs/core';
import { NewsDto } from '../dtos/NewsDto';
import newsService from '../services/newsService';
import authorService from '../services/authorService';
import cors from 'cors';

@Controller('news')
@ClassMiddleware([cors()])
export default class NewsController {
    @Post()
    async create(req: Request, res: Response) {
        const { author: authorId, content, title } = req.body;

        const author = await authorService.get(authorId);

        const newsDto = {
            author,
            content,
            title,
        } as NewsDto;

        return res.status(201).json(await newsService.create(newsDto));
    }

    @Patch(':id')
    async update(req: Request, res: Response) {
        const { author: authorId, content, title } = req.body;

        const newsDto: Partial<NewsDto> = {
            id: req.params.id,
        };

        if (authorId) {
            newsDto.author = await authorService.get(authorId);
        }

        if (content) {
            newsDto.content = content;
        }

        if (title) {
            newsDto.title = title;
        }

        return res.json(await newsService.update(newsDto));
    }

    @Get()
    async list(req: Request, res: Response) {
        return res.json(await newsService.list());
    }

    @Get(':id')
    async get(req: Request, res: Response) {
        return res.json(await newsService.get(req.params.id));
    }

    @Delete(':id')
    async delete(req: Request, res: Response) {
        res.json(await newsService.delete(req.params.id));
    }
}
