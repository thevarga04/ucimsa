package ucimsa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "registration_and_reset")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JpaRegisterAndReset {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private int token;
  private long validUntil;
  private String username;

}
