<?php

namespace App\Controller;

use App\Entity\Team;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class TeamGetStudentsController
{
    private $security;

    public function __construct(Security $security)
    {
        // Avoid calling getUser() in the constructor: auth may not
        // be complete yet. Instead, store the entire Security object.
        $this->security = $security;
    }

    public function  __invoke(Team $data, AuthorizationCheckerInterface $authChecker)
    {
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
}
