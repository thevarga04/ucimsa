package ucimsa.realm;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JpaUser {

  private int id;
  @Id
  private String username;
  private String firstname;
  private String lastname;
  private String password;
  private boolean activated;

  @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
  @JoinTable(name = "users_roles"
      , joinColumns = @JoinColumn(name = "users_username", referencedColumnName = "username")
      , inverseJoinColumns = @JoinColumn(name = "roles_name", referencedColumnName = "name")
  )
  private Set<JpaRole> roles;


  @Override
  public String toString() {
    return "JpaUser{" +
        "id=" + id +
        ", username='" + username + '\'' +
        ", firstname='" + firstname + '\'' +
        ", lastname='" + lastname + '\'' +
        ", activated=" + activated +
        ", roles=" + roles +
        '}';
  }
}
