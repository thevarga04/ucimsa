package ucimsa.learn;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "lesson_split_sentences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JpaOptionsSplitSentences {

  @Id
  private int id;
  private int userId;
  private int textId;
  private int coverage;
  private int splits;
  private int matching;
  private int sections;

}
