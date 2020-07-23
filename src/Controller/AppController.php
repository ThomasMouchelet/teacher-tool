<?php

namespace App\Controller;

use App\Entity\Delivrable;
use App\Entity\Project;
use App\Repository\ProjectRepository;
use App\Repository\TeamRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Faker\Factory;

class AppController extends AbstractController
{
    /**
     * @Route("/app", name="app")
     */
    public function index(TeamRepository $ripo, EntityManagerInterface $manager)
    {
        // $faker = Factory::create('fr_FR');
        // $teams = $ripo->findAll();

        // $project = new Project();

        // foreach ($teams as $team) {
        //     $studentsInTeam = $team->getStudents();

        //     foreach ($studentsInTeam as $studentIt) {

        //         // dump($studentIt);
        //         $delivrable = new Delivrable();
        //         $delivrable->setName($studentIt->getFirstName() . "-" . $studentIt->getLastName())
        //             ->setUploadedAt($faker->dateTimeBetween('-6 months'))
        //             ->setPath("http://localhost/uploads/name.zip")
        //             ->setProject($project)
        //             ->setStudent($studentIt)
        //             ->setStatus("UPLOADED");

        //         dump($delivrable);
        //         // $manager->persist($delivrable);
        //     }
        // }
        // dd("end");

        // // $manager->flush();

        return $this->render('app/index.html.twig', [
            'controller_name' => 'AppController',
        ]);
    }
}
