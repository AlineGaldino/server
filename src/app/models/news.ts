import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Author from './author';

@Entity('news')
class News {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    content: string;

    @Column()
    title: string;

    @ManyToOne(type => Author, author => author.news )
    author: Author;
}

export default News;
