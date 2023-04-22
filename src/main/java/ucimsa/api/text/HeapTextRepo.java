package ucimsa.api.text;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeapTextRepo extends JpaRepository<JpaHeapText, Integer> {

  List<JpaHeapText> findByUserId(int userId);
}
