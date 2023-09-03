import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationNullable1691702316863 implements MigrationInterface {
    name = 'UpdateRelationNullable1691702316863'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurant_profiles\` DROP FOREIGN KEY \`FK_875539aaae8bbaf9773213346f0\``);
        await queryRunner.query(`ALTER TABLE \`restaurant_profiles\` CHANGE \`restaurant_id\` \`restaurant_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`restaurants\` DROP FOREIGN KEY \`FK_9583badca4402f01779423b53f6\``);
        await queryRunner.query(`ALTER TABLE \`restaurants\` CHANGE \`category_id\` \`category_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`restaurant_profiles\` ADD CONSTRAINT \`FK_875539aaae8bbaf9773213346f0\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`restaurants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`restaurants\` ADD CONSTRAINT \`FK_9583badca4402f01779423b53f6\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurants\` DROP FOREIGN KEY \`FK_9583badca4402f01779423b53f6\``);
        await queryRunner.query(`ALTER TABLE \`restaurant_profiles\` DROP FOREIGN KEY \`FK_875539aaae8bbaf9773213346f0\``);
        await queryRunner.query(`ALTER TABLE \`restaurants\` CHANGE \`category_id\` \`category_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`restaurants\` ADD CONSTRAINT \`FK_9583badca4402f01779423b53f6\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`restaurant_profiles\` CHANGE \`restaurant_id\` \`restaurant_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`restaurant_profiles\` ADD CONSTRAINT \`FK_875539aaae8bbaf9773213346f0\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`restaurants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
