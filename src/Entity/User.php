<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;


/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ApiResource(
 *  subresourceOperations={
 *      "api_roles_users_get_subresource"={
 *          "normalization_context"={"groups"={"role_subresource"}}
 *      },
 *      "api_teams_users_get_subresource"={
 *          "normalization_context"={"groups"={"teams_subresource"}}
 *      }
 *  },
 *  normalizationContext={
 *     "groups"={"users_read"}
 *  }
 * )
 */
class User implements UserInterface
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     * @Groups({"users_read", "role_subresource","teams_subresource","students_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"users_read", "role_subresource","teams_subresource","students_subresource"})
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups({"users_read", "users_subresource","teams_subresource","students_subresource"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;

    /**
     * @ORM\ManyToMany(targetEntity=Role::class, mappedBy="users")
     */
    private $dbroles;


    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"users_read", "role_subresource","teams_subresource","students_subresource"})
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"users_read", "role_subresource","teams_subresource","students_subresource"})
     */
    private $lastName;

    /**
     * @ORM\ManyToMany(targetEntity=Team::class, mappedBy="users")
     * @Groups({"users_read", "role_subresource"})
     */
    private $teams;

    public function __construct()
    {
        $this->dbroles = new ArrayCollection();
        $this->teams = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
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
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        $dbroles = $this->getDbroles();

        foreach ($dbroles as $role) {
            array_push($roles, $role->getType());
        }

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @return Collection|Role[]
     */
    public function getDbroles(): Collection
    {
        return $this->dbroles;
    }

    public function addDbrole(Role $dbrole): self
    {
        if (!$this->dbroles->contains($dbrole)) {
            $this->dbroles[] = $dbrole;
            $dbrole->addUser($this);
            $dbroles = $this->getDbroles();
            $rolesArray = [];
            foreach ($dbroles as $role) {
                array_push($rolesArray, $role->getType());
            }
            $this->setRoles($rolesArray);
        }

        return $this;
    }

    public function removeDbrole(Role $dbrole): self
    {
        if ($this->dbroles->contains($dbrole)) {
            $this->dbroles->removeElement($dbrole);
            $dbrole->removeUser($this);
        }

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(?string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(?string $lastName): self
    {
        $this->lastName = $lastName;

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
            $team->addUser($this);
        }

        return $this;
    }

    public function removeTeam(Team $team): self
    {
        if ($this->teams->contains($team)) {
            $this->teams->removeElement($team);
            $team->removeUser($this);
        }

        return $this;
    }
}
