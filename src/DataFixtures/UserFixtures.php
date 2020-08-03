<?php

namespace App\DataFixtures;

use App\Entity\Role;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\VarDumper\Cloner\Data;


class UserFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
    }

    public function load(ObjectManager $manager)
    {
        $faker = Factory::create('fr_FR');

        $roleadmin = new Role();
        $roleadmin->setType("ROLE_ADMIN");
        $manager->persist($roleadmin);

        $roleuser = new Role();
        $roleuser->setType("ROLE_USER");
        $manager->persist($roleuser);

        for ($u = 0; $u < 3; $u++) {

            $user = new User();
            $hash = $this->encoder->encodePassword($user, "password");

            $user->setEmail($faker->email())
                ->setPassword($hash)
                ->addDbrole($roleadmin);

            $manager->persist($user);
        }
        $manager->flush();
    }
}
