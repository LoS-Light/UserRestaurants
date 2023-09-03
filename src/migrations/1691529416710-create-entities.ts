import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEntities1691529416710 implements MigrationInterface {
    name = 'CreateEntities1691529416710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`restaurant_profiles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`location\` varchar(32) NOT NULL, \`google_map\` varchar(2048) NOT NULL, \`phone\` varchar(32) NULL, \`description\` text NULL, \`restaurant_id\` int NULL, UNIQUE INDEX \`REL_875539aaae8bbaf9773213346f\` (\`restaurant_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`restaurants\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`name_en\` varchar(30) NOT NULL, \`image\` varchar(2048) NULL, \`rating\` float NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`restaurant_id\` int NULL, UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`restaurant_profiles\` ADD CONSTRAINT \`FK_875539aaae8bbaf9773213346f0\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`restaurants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_5afdea164dc28f2c02370eedb41\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`restaurants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_5afdea164dc28f2c02370eedb41\``);
        await queryRunner.query(`ALTER TABLE \`restaurant_profiles\` DROP FOREIGN KEY \`FK_875539aaae8bbaf9773213346f0\``);
        await queryRunner.query(`DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP TABLE \`restaurants\``);
        await queryRunner.query(`DROP INDEX \`REL_875539aaae8bbaf9773213346f\` ON \`restaurant_profiles\``);
        await queryRunner.query(`DROP TABLE \`restaurant_profiles\``);
    }

}
