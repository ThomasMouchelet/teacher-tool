<?php

namespace App\Entity;

use App\Repository\ProjectRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ProjectRepository::class)
 * @ApiResource(
 *  subresourceOperations={
 *      "api_teams_projects_get_subresource"={
 *          "normalization_context"={"groups"={"projects_subresource"}}
 *      }
 *  },
 *  normalizationContext={
 *     "groups"={"projects_read"}
 *  },
 *  attributes={
 *      "order": {"endingAt":"desc"}
 *  }
 * )
 */
class Project
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"projects_read","projects_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"projects_read","projects_subresource"})
     * @Assert\NotBlank(message="Le nom doit être renseigné !")
     * @Assert\Length(min=3, minMessage="Le nom doit faire entre 3 et 255 caractères", max=255, maxMessage="Le nom doit faire entre 3 et 255 caractères")
     */
    private $name;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"projects_read"})
     * @Assert\DateTime(message="La date doit être au format YYYY-MM-DD")
     * @Assert\NotBlank(message="La date d'envoi doit être renseignée")
     */
    private $createdAt;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"projects_read","projects_subresource"})
     * @Assert\DateTime(message="La date doit être au format YYYY-MM-DD")
     * @Assert\NotBlank(message="La date d'envoi doit être renseignée")
     */
    private $endingAt;

    /**
     * @ORM\Column(type="text")
     * @Groups({"projects_read"})
     * @Assert\NotBlank(message="Le statut est obligatoire")
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"projects_read"})
     * @Assert\NotBlank(message="Le statut est obligatoire")
     * @Assert\Choice(choices={"OPEN", "CLOSE"}, message="Le statut doit être Close ou Open")
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity=Team::class, inversedBy="projects")
     * @Groups({"projects_read"})
     */
    private $team;

    /**
     * @ORM\OneToMany(targetEntity=Delivrable::class, mappedBy="project")
     * @Groups({"projects_read"})
     */
    private $delivrables;

    public function __construct()
    {
        $this->delivrables = new ArrayCollection();
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

    public function getEndingAt(): ?\DateTimeInterface
    {
        return $this->endingAt;
    }

    public function setEndingAt(\DateTimeInterface $endingAt): self
    {
        $this->endingAt = $endingAt;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getTeam(): ?Team
    {
        return $this->team;
    }

    public function setTeam(?Team $team): self
    {
        $this->team = $team;

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
            $delivrable->setProject($this);
        }

        return $this;
    }

    public function removeDelivrable(Delivrable $delivrable): self
    {
        if ($this->delivrables->contains($delivrable)) {
            $this->delivrables->removeElement($delivrable);
            // set the owning side to null (unless already changed)
            if ($delivrable->getProject() === $this) {
                $delivrable->setProject(null);
            }
        }

        return $this;
    }
}
