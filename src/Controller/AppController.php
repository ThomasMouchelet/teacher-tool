<?php

namespace App\Controller;

use App\Entity\Role;
use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

class AppController extends AbstractController
{
    /**
     * @Route("/", name="app")
     */
    public function index()
    {
        return $this->render('app/index.html.twig');
    }

    /**
     * @Route("/test", name="test")
     */
    public function test()
    {

        $roleadmin = new Role();
        $roleadmin->setType("ROLE_ADMIN");

        $user = new User();

        $user->setEmail("test@test.com")
            ->setPassword('password')
            ->addDbrole($roleadmin);

        dd($user);

        return new Response(
            'test'
        );
    }
}
