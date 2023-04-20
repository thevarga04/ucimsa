package ucimsa.api.text;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HeapTextRepo extends JpaRepository<JpaHeapText, Integer> {

}
