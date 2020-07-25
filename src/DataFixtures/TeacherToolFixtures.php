<?php

namespace App\DataFixtures;

use App\Entity\Delivrable;
use App\Entity\Project;
use App\Entity\Student;
use App\Entity\Teacher;
use App\Entity\Team;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\VarDumper\Cloner\Data;

class TeacherToolFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        for ($t = 0; $t < 1; $t++) {
            $teacher = new Teacher();
            $hash = $this->encoder->encodePassword($teacher, "password");

            $teacher->setFirstName($faker->firstName())
                ->setLastName($faker->lastName())
                ->setEmail($faker->email())
                ->setPassword($hash);

            $manager->persist($teacher);

            for ($te = 0; $te < mt_rand(1, 3); $te++) {
                $team = new Team();
                $team->setName($faker->company())
                    ->setCreatedAt($faker->dateTimeBetween('-6 months'))
                    ->setTeacher($teacher);

                $manager->persist($team);

                for ($stu = 0; $stu < mt_rand(5, 12); $stu++) {
                    $student = new Student();
                    $hash = $this->encoder->encodePassword($student, "password");

                    $student->setFirstName($faker->firstName())
                        ->setLastName($faker->lastName())
                        ->setEmail($faker->email())
                        ->setPassword($hash)
                        ->addTeam($team);

                    $manager->persist($student);
                }

                for ($pro = 0; $pro < mt_rand(1, 8); $pro++) {
                    $project = new Project();

                    $project->setName($faker->text($maxNbChars = 30))
                        ->setCreatedAt($faker->dateTimeBetween('-6 months'))
                        ->setEndingAt($faker->dateTimeBetween($startDate = $project->getCreatedAt(), $endDate = 'now', $timezone = null))
                        ->setDescription($faker->sentence($nbWords = 6, $variableNbWords = true))
                        ->setStatus("OPEN")
                        ->setTeam($team);

                    $manager->persist($project);

                    $studentsInTeam = $team->getStudents();

                    foreach ($studentsInTeam as $studentIt) {
                        $delivrable = new Delivrable();

                        $delivrable->setName($studentIt->getFirstName() . "-" . $studentIt->getLastName())
                            ->setUploadedAt($faker->dateTimeBetween($startDate = $project->getCreatedAt(), $endDate = 'now', $timezone = null))
                            ->setPath("http://localhost/uploads/name.zip")
                            ->setProject($project)
                            ->setStudent($studentIt)
                            ->setStatus("UPLOADED");

                        $manager->persist($delivrable);
                    }
                }
            }
        }

        $manager->flush();
    }
}
