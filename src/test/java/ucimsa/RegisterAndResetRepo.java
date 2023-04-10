package ucimsa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegisterAndResetRepo extends JpaRepository<JpaRegisterAndReset, Integer> {

}
