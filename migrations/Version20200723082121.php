<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20200723082121 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE delivrable (id INT AUTO_INCREMENT NOT NULL, student_id INT DEFAULT NULL, project_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, uploaded_at DATETIME NOT NULL, path VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, INDEX IDX_D628D772CB944F1A (student_id), INDEX IDX_D628D772166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project (id INT AUTO_INCREMENT NOT NULL, team_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, ending_at DATETIME NOT NULL, description LONGTEXT NOT NULL, status VARCHAR(255) NOT NULL, INDEX IDX_2FB3D0EE296CD8AE (team_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE student (id INT AUTO_INCREMENT NOT NULL, last_name VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE student_team (student_id INT NOT NULL, team_id INT NOT NULL, INDEX IDX_FBC3DDC7CB944F1A (student_id), INDEX IDX_FBC3DDC7296CD8AE (team_id), PRIMARY KEY(student_id, team_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE teacher (id INT AUTO_INCREMENT NOT NULL, last_name VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE team (id INT AUTO_INCREMENT NOT NULL, teacher_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_C4E0A61F41807E1D (teacher_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE delivrable ADD CONSTRAINT FK_D628D772CB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
        $this->addSql('ALTER TABLE delivrable ADD CONSTRAINT FK_D628D772166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE project ADD CONSTRAINT FK_2FB3D0EE296CD8AE FOREIGN KEY (team_id) REFERENCES team (id)');
        $this->addSql('ALTER TABLE student_team ADD CONSTRAINT FK_FBC3DDC7CB944F1A FOREIGN KEY (student_id) REFERENCES student (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE student_team ADD CONSTRAINT FK_FBC3DDC7296CD8AE FOREIGN KEY (team_id) REFERENCES team (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE team ADD CONSTRAINT FK_C4E0A61F41807E1D FOREIGN KEY (teacher_id) REFERENCES teacher (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE delivrable DROP FOREIGN KEY FK_D628D772166D1F9C');
        $this->addSql('ALTER TABLE delivrable DROP FOREIGN KEY FK_D628D772CB944F1A');
        $this->addSql('ALTER TABLE student_team DROP FOREIGN KEY FK_FBC3DDC7CB944F1A');
        $this->addSql('ALTER TABLE team DROP FOREIGN KEY FK_C4E0A61F41807E1D');
        $this->addSql('ALTER TABLE project DROP FOREIGN KEY FK_2FB3D0EE296CD8AE');
        $this->addSql('ALTER TABLE student_team DROP FOREIGN KEY FK_FBC3DDC7296CD8AE');
        $this->addSql('DROP TABLE delivrable');
        $this->addSql('DROP TABLE project');
        $this->addSql('DROP TABLE student');
        $this->addSql('DROP TABLE student_team');
        $this->addSql('DROP TABLE teacher');
        $this->addSql('DROP TABLE team');
    }
}
