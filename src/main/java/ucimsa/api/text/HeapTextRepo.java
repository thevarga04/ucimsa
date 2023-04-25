package ucimsa.api.text;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeapTextRepo extends JpaRepository<JpaHeapText, Integer> {

  List<JpaHeapText> findByUserId(int userId);

  Optional<JpaHeapText> findByIdAndUserId(int id, int userId);

  Integer deleteByIdAndUserId(int id, int userId);


}
