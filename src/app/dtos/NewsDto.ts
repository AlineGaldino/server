import Author from '../models/author';

export interface NewsDto {
    id?: string;
    author?: Author|any;
    content: string;
    title: string;
}
