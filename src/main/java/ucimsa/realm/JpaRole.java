package ucimsa.realm;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "roles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
