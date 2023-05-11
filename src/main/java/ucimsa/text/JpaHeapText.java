package ucimsa.text;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
@Builder
public class JpaHeapText {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private int userId;
  private String name;

  @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
  @JoinColumn(name = "text_id")
  private List<JpaSentence> sentences = new ArrayList<>();


  @Override
  public String toString() {
    return "JpaHeapText{" +
        "id=" + id +
        ", userId=" + userId +
        ", name='" + name + '\'' +
        '}';
  }

}
