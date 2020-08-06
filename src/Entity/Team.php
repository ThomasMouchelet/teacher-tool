<?php

namespace App\Entity;

use App\Repository\TeamRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=TeamRepository::class)
 * @ApiResource(
 *  subresourceOperations={
 *      "projects_get_subresource"={"path"="/teams/{id}/projects"},
 *      "users_get_subresource"={"path"="/teams/{id}/users"}
 *  },
 *  itemOperations={"GET", "PUT", "DELETE", 
 *     "get_team_students"={
 *       "method"="get",
 *       "path"="/teams/{id}/students", 
 *       "controller"="App\Controller\TeamStudentsController", 
 *       "swagger_context"={
 *          "summary"="Get all students",
 *          "description"="Get all students"
 *       },
 *       "normalization_context"={"groups"={"students_subresource"}},
 *     },
 *     "post_team_students"={
 *       "method"="post",
 *       "path"="/teams/{id}/students", 
 *       "controller"="App\Controller\TeamStudentsController", 
 *       "swagger_context"={
 *          "summary"="Get all students",
 *          "description"="Get all students"
 *       },
 *       "normalization_context"={"groups"={"students_pos_subresource"}},
 *     }
 *  },
 *  normalizationContext={"groups"={"teams_read"}},
 *  denormalizationContext={"disable_type_enforcement"=true}
 * )
 */
class Team
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"teams_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"teams_read"})
     * 
     * @Assert\NotBlank(message="Le nom doit être renseigné !")
     * @Assert\Length(min=3, minMessage="Le nom doit faire entre 3 et 255 caractères", max=255, maxMessage="Le nom doit faire entre 3 et 255 caractères")
     */
    private $name;

    /**
     * @ORM\Column(type="datetime")
     * 
     * @Assert\Type("\DateTimeInterface")
     * @Assert\NotBlank(message="La date d'envoi doit être renseignée")
     */
    private $createdAt;

    /**
     * @ORM\OneToMany(targetEntity=Project::class, mappedBy="team")
     * @ApiSubresource
     */
    private $projects;

    /**
     * @ORM\ManyToMany(targetEntity=User::class, inversedBy="teams")
     * @ApiSubresource
     */
    private $users;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"teams_read"})
     */
    private $identifier;

    public function __construct()
    {
        $this->projects = new ArrayCollection();
        $this->users = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection|Project[]
     */
    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function addProject(Project $project): self
    {
        if (!$this->projects->contains($project)) {
            $this->projects[] = $project;
            $project->setTeam($this);
        }

        return $this;
    }

    public function removeProject(Project $project): self
    {
        if ($this->projects->contains($project)) {
            $this->projects->removeElement($project);
            // set the owning side to null (unless already changed)
            if ($project->getTeam() === $this) {
                $project->setTeam(null);
            }
        }

        return $this;
    }

    public function setUser($user)
    {
        $this->addUser($user);
    }

    /**
     * @return Collection|User[]
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): self
    {
        if (!$this->users->contains($user)) {
            $this->users[] = $user;
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->users->contains($user)) {
            $this->users->removeElement($user);
        }

        return $this;
    }

    public function getIdentifier(): ?string
    {
        return $this->identifier;
    }

    public function setIdentifier(string $identifier): self
    {
        $this->identifier = $identifier;

        return $this;
    }
}
