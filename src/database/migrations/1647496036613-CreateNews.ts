import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateNews1647496036613 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'news',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                }, {
                    name: 'title',
                    type: 'varchar',
                }, {
                    name: 'content',
                    type: 'text',
                    length: '4096',
                },{
                    name: 'authorId',
                    type: 'varchar',
                },
            ],
        }));

        const foreignKey = new TableForeignKey({
            columnNames: ['authorId'],
            onDelete: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'authors',
        });

        await queryRunner.createForeignKey('news', foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('news');
    }
}
