<?php

namespace App\Events;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\KernelEvents;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use App\Repository\TeamRepository;
use App\Entity\Team;

class TeamSubscriber implements EventSubscriberInterface
{
    private $repository;

    public function __construct(TeamRepository $repository)
    {
        $this->repository = $repository;
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

        if ($team instanceof Team && $method === "POST") {
            // TODO : A déplacer dans une classe dédiée
            if (empty($team->getCreatedAt())) {
                $team->setCreatedAt(new \DateTime());
            }
        }
    }
}
