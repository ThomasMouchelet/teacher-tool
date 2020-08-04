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
 *          "normalization_context"={"groups"={"users_subresource"}}
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
     * @Groups({"users_read", "users_subresource"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"users_read", "users_subresource"})
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups({"users_read", "users_subresource"})
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
     * @ORM\OneToMany(targetEntity=Team::class, mappedBy="teacher")
     */
    private $teams;

    public function __construct()
    {
        $this->dbroles = new ArrayCollection();
        $this->teams = new ArrayCollection();
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
            $team->setUser($this);
        }

        return $this;
    }

    public function removeTeam(Team $team): self
    {
        if ($this->teams->contains($team)) {
            $this->teams->removeElement($team);
            // set the owning side to null (unless already changed)
            if ($team->getUser() === $this) {
                $team->setUser(null);
            }
        }

        return $this;
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
}
