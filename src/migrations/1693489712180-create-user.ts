import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1693489712180 implements MigrationInterface {
    name = 'CreateUser1693489712180'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(32) NOT NULL, \`password\` varchar(16) NOT NULL, \`facebook_id\` varchar(255) NULL, \`google_id\` varchar(255) NULL, \`name\` varchar(16) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`restaurants\` ADD \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`restaurants\` ADD CONSTRAINT \`FK_cea868890cfad22c3094c80722e\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurants\` DROP FOREIGN KEY \`FK_cea868890cfad22c3094c80722e\``);
        await queryRunner.query(`ALTER TABLE \`restaurants\` DROP COLUMN \`user_id\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
