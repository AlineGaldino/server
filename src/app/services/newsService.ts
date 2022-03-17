import { getRepository } from 'typeorm';
import News from '../models/news';
import { NewsDto } from '../dtos/NewsDto';
import Author from '../models/author';

class NewsService {
    async create(newsDto: NewsDto) {
        const repository = getRepository(News);
        const news = repository.create(newsDto);

        await repository.save(news);

        return news;
    }

    async list() {
        return getRepository(News).find();
    }

    async get(id: string) {
        const rawAndEntities = await getRepository(News)
            .createQueryBuilder('n')
            .innerJoinAndMapOne('author', 'authors', 'a', 'n.authorId = a.id')
            .where(`n.id = '${id}'`)
            .getRawAndEntities();

        const news = rawAndEntities.entities.shift();

        if (!news) {
            return undefined;
        }

        news.author = { id: rawAndEntities.raw.shift()?.a_id } as Author;

        return news;
    }

    async update(news: Partial<News>) {
        const repository = getRepository(News);

        const dbNews = await repository.findOne({ id: news.id }) ?? {};
        const updatedNews = { ...dbNews, ...news } as News;

        await repository.update({ id: updatedNews.id }, updatedNews);

        return updatedNews;
    }

    async delete(id: string) {
        await getRepository(News).delete({ id });
    }
}

const instance = new NewsService();
export default instance;
