import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import News from './news';

@Entity('authors')
class Author {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @OneToMany(type => News, news => news.author)
    news: News[];
}

export default Author;
