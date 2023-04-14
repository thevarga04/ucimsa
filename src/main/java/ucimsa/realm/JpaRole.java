package ucimsa.realm;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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


  @Override
  public String toString() {
    return "RoleJpa{" +
        "name='" + name + '\'' +
        '}';
  }
}
