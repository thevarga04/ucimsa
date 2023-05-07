package ucimsa.text;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sentences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JpaSentence {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "text_id")
  private JpaHeapText jpaHeapText;

  private String line;


  @Override
  public String toString() {
    return "JpaSentence{" +
        "id=" + id +
        ", textId=" + jpaHeapText.getId() +
        ", line='" + line + '\'' +
        '}';
  }

}
