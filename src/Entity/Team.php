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
 *      "stuents_get_subresource"={"path"="/teams/{id}/students"}
 *  },
 *  itemOperations={"GET", "PUT", "DELETE"},
 *  normalizationContext={"groups"={"teams_read"}},
 *  denormalizationContext={"disable_type_enforcement"=true}
 * )
 */
class Team
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
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
     * @ORM\ManyToOne(targetEntity=Teacher::class, inversedBy="teams")
     * 
     * @Assert\NotBlank(message="Le teacher doit être renseigné !")
     */
    private $teacher;

    /**
     * @ORM\ManyToMany(targetEntity=Student::class, mappedBy="teams")
     * @ApiSubresource
     */
    private $students;

    /**
     * @ORM\OneToMany(targetEntity=Project::class, mappedBy="team")
     * @ApiSubresource
     */
    private $projects;

    public function __construct()
    {
        $this->students = new ArrayCollection();
        $this->projects = new ArrayCollection();
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

    public function getTeacher(): ?Teacher
    {
        return $this->teacher;
    }

    public function setTeacher(?Teacher $teacher): self
    {
        $this->teacher = $teacher;

        return $this;
    }

    /**
     * @return Collection|Student[]
     */
    public function getStudents(): Collection
    {
        return $this->students;
    }

    public function addStudent(Student $student): self
    {
        if (!$this->students->contains($student)) {
            $this->students[] = $student;
            $student->addTeam($this);
        }

        return $this;
    }

    public function removeStudent(Student $student): self
    {
        if ($this->students->contains($student)) {
            $this->students->removeElement($student);
            $student->removeTeam($this);
        }

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
}
