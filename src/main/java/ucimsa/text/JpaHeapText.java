package ucimsa.text;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

/**
 * id <br>
 * userId <br>
 * name <br>
 * sentences <br>
 */
@Entity
@Table(name = "heap_texts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class JpaHeapText {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private int userId;
  private String name;
  private String sentences;


  @Override
  public String toString() {
    return "JpaHeapText{" +
        "id=" + id +
        ", userId=" + userId +
        ", name='" + name + '\'' +
        ", sentences='" + sentences + '\'' +
        '}';
  }
}
