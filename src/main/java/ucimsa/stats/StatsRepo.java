package ucimsa.stats;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatsRepo extends JpaRepository<JpaHitSplitSentences, Integer> {

  List<JpaHitSplitSentences> getByUserIdAndLessonId(int userId, int lessonId);

}
