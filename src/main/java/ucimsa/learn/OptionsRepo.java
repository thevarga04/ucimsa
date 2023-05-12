package ucimsa.learn;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OptionsRepo extends JpaRepository<JpaOptionsSplitSentences, Integer> {


}
