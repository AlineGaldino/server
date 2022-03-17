import { getRepository } from 'typeorm';
import Author from '../models/author';
import { AuthorDto } from '../dtos/AuthorDto';

class authorService {
    async create(authorDto: AuthorDto) {
        const repository = getRepository(Author);
        const author = repository.create(authorDto);

        await repository.save(author);

        return author;
    }

    async list() {
        return getRepository(Author).find();
    }

    async get(id: string) {
        return getRepository(Author).findOne({ where: { id } });
    }

    async update(author: Partial<Author>) {
        const repository = getRepository(Author);

        const dbAuthor = await repository.findOne({ id: author.id }) ?? {};
        const updatedAuthor = { ...dbAuthor, ...author } as Author;

        await repository.update({ id: updatedAuthor.id }, updatedAuthor);

        return updatedAuthor;
    }

    async delete(id: string) {
        await getRepository(Author).delete({ id });
    }
}

const instance = new authorService();
export default instance;
