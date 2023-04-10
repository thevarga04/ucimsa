package ucimsa.realm;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
  private int id;
  private String username;
  private String firstname;
  private String lastname;
  private String password;
  private boolean activated;

  private List<Role> roles;


  @Override
  public String toString() {
    return "User{" +
        "id=" + id +
        ", username='" + username + '\'' +
        ", firstname='" + firstname + '\'' +
        ", lastname='" + lastname + '\'' +
        ", activated=" + activated +
        ", roles=" + roles +
        '}';
  }
}
