<?php

namespace App\Events;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use App\Repository\TeamRepository;
use App\Entity\Team;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Uid\Uuid;

class TeamSubscriber implements EventSubscriberInterface
{
    private $repository;
    private $security;

    public function __construct(TeamRepository $repository, Security $security)
    {
        $this->repository = $repository;
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['setTeam', EventPriorities::PRE_VALIDATE]
        ];
    }

    public function setTeam(ViewEvent $event)
    {
        $team = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        $uuid = Uuid::v4();
        if ($team instanceof Team && $method === "POST") {
            $team->addUser($this->security->getUser());
            if (empty($team->getCreatedAt())) {
                $team->setCreatedAt(new \DateTime());
            }
            $team->setIdentifier($uuid);
        }
    }
}
