<?php

namespace App\Entity;

use App\Repository\StudentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=StudentRepository::class)
 */
class Student
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\ManyToMany(targetEntity=Team::class, inversedBy="students")
     */
    private $teams;

    /**
     * @ORM\OneToMany(targetEntity=Delivrable::class, mappedBy="student")
     */
    private $delivrables;

    public function __construct()
    {
        $this->teams = new ArrayCollection();
        $this->delivrables = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * @return Collection|Team[]
     */
    public function getTeams(): Collection
    {
        return $this->teams;
    }

    public function addTeam(Team $team): self
    {
        if (!$this->teams->contains($team)) {
            $this->teams[] = $team;
        }

        return $this;
    }

    public function removeTeam(Team $team): self
    {
        if ($this->teams->contains($team)) {
            $this->teams->removeElement($team);
        }

        return $this;
    }

    /**
     * @return Collection|Delivrable[]
     */
    public function getDelivrables(): Collection
    {
        return $this->delivrables;
    }

    public function addDelivrable(Delivrable $delivrable): self
    {
        if (!$this->delivrables->contains($delivrable)) {
            $this->delivrables[] = $delivrable;
            $delivrable->setStudent($this);
        }

        return $this;
    }

    public function removeDelivrable(Delivrable $delivrable): self
    {
        if ($this->delivrables->contains($delivrable)) {
            $this->delivrables->removeElement($delivrable);
            // set the owning side to null (unless already changed)
            if ($delivrable->getStudent() === $this) {
                $delivrable->setStudent(null);
            }
        }

        return $this;
    }
}
