package ucimsa.stats;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "stats_split_sentences")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JpaHitSplitSentences {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private int userId;
  private int textId;
  private int lessonId;
  private int sentenceId;
  private boolean goodPick;
  private long timestamp; // https://currentmillis.com/

}
