import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAuthor1647496012447 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'authors',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'uuid',
                }, {
                    name: 'name',
                    type: 'varchar',
                    isUnique: true,
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('authors');
    }

}
