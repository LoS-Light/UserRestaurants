import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRestUserNullable1693643927327 implements MigrationInterface {
    name = 'UpdateRestUserNullable1693643927327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurants\` DROP FOREIGN KEY \`FK_cea868890cfad22c3094c80722e\``);
        await queryRunner.query(`ALTER TABLE \`restaurants\` CHANGE \`user_id\` \`user_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`restaurants\` ADD CONSTRAINT \`FK_cea868890cfad22c3094c80722e\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurants\` DROP FOREIGN KEY \`FK_cea868890cfad22c3094c80722e\``);
        await queryRunner.query(`ALTER TABLE \`restaurants\` CHANGE \`user_id\` \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`restaurants\` ADD CONSTRAINT \`FK_cea868890cfad22c3094c80722e\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
