import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';

export class CreateTestingUser1745475429275 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const email = 'test@example.com';
    const login = 'testuser';
    const password = await bcrypt.hash('test', 10);

    await queryRunner.query(
      `INSERT INTO users (email, login, password, isActive, isOnline)
       VALUES ('${email}', '${login}', '${password}', true, false)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM users WHERE email = 'test@example.com'`,
    );
  }
}
