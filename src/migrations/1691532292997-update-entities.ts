import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateEntities1691532292997 implements MigrationInterface {
    name = 'UpdateEntities1691532292997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_5afdea164dc28f2c02370eedb41\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`restaurant_id\``);
        await queryRunner.query(`ALTER TABLE \`restaurants\` ADD \`category_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`restaurants\` ADD CONSTRAINT \`FK_9583badca4402f01779423b53f6\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurants\` DROP FOREIGN KEY \`FK_9583badca4402f01779423b53f6\``);
        await queryRunner.query(`ALTER TABLE \`restaurants\` DROP COLUMN \`category_id\``);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`restaurant_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_5afdea164dc28f2c02370eedb41\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`restaurants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
