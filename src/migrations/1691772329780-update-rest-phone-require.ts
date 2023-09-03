import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRestPhoneRequire1691772329780 implements MigrationInterface {
    name = 'UpdateRestPhoneRequire1691772329780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurant_profiles\` CHANGE \`phone\` \`phone\` varchar(32) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`restaurant_profiles\` CHANGE \`phone\` \`phone\` varchar(32) NULL`);
    }

}
