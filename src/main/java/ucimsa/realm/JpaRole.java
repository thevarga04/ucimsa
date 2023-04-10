package ucimsa.realm;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class JpaRole {

  @Id
  private String name;
  @ManyToMany(mappedBy = "roles")
  private Set<JpaUser> users;


  @Override
  public String toString() {
    return "RoleJpa{" +
        "name='" + name + '\'' +
        '}';
  }
}
