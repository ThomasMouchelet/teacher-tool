<?php

namespace App\Controller;

use App\Entity\Team;
use App\Repository\RoleRepository;
use App\Repository\UserRepository;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;

class TeamStudentsController
{
    private $security;
    private $em;

    /** @var ObjectManager */
    public function __construct(Security $security, EntityManagerInterface $em)
    {
        $this->security = $security;
        $this->em = $em;
    }

    public function  __invoke(Team $data, Request $request, UserRepository $ripoUser, RoleRepository $roleRipo)
    {

        if ($request->isMethod('GET')) {
            $userConnect = $this->security->getUser();
            $students = [];
            $users = $data->getUsers()->toArray();

            foreach ($users as $user) {

                if ($userConnect->getId() !== $user->getId() && in_array("ROLE_STUDENT", $user->getRoles())) {
                    array_push($students, $user);
                }
            }

            return $students;
        }

        if ($request->isMethod('POST')) {
            if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
                $dataRequest = json_decode($request->getContent(), true);
                $user = $ripoUser->find($dataRequest["id"]);
                $data->addUser($user);

                $studentRole = $roleRipo->findOneBy(["type" => "ROLE_STUDENT"]);
                $user->addDbrole($studentRole);

                $this->em->persist($user);
                $this->em->persist($data);

                $this->em->flush();

                return $data->getUsers();
            }
        }
    }
}
