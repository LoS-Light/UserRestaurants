import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserPasswordLength1693624500992 implements MigrationInterface {
    name = 'UpdateUserPasswordLength1693624500992'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(72) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`password\` varchar(16) NOT NULL`);
    }

}
