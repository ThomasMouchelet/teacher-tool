<?php

namespace App\Doctrine;

use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use App\Entity\Team;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Security;
use App\Entity\User;

class TeamUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{
    private $security;
    private $auth;

    public function __construct(Security $security, AuthorizationCheckerInterface $checker)
    {
        $this->security = $security;
        $this->auth = $checker;
    }

    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass)
    {
    }

    public function applyToCollection(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, ?string $operationName = null)
    {
        $user = $this->security->getUser();

        if (
            ($resourceClass === Team::class)
            &&
            $user instanceof User
        ) {
            $rootAlias = $queryBuilder->getRootAliases()[0];

            $queryBuilder->innerJoin("$rootAlias.users", "u");

            $queryBuilder->where("u = :user")
                ->setParameter('user', $user);
        }
    }

    public function applyToItem(QueryBuilder $queryBuilder, QueryNameGeneratorInterface $queryNameGenerator, string $resourceClass, array $identifiers, ?string $operationName = null, array $context = [])
    {
        // $this->addWhere($queryBuilder, $resourceClass);

    }
}
