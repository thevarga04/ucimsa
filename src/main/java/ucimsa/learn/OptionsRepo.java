package ucimsa.learn;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionsRepo extends JpaRepository<JpaOptionsSplitSentences, Integer> {

  List<JpaOptionsSplitSentences> findByUserIdAndTextId(int userId, int textId);


}
