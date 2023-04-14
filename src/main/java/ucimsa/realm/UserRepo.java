package ucimsa.realm;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<JpaUser, Integer> {

  /**
   * Because none of the following works:
   * jakarta.persistence.Column(columnDefinition = "serial")
   * @GeneratedValue(strategy = GenerationType.SEQUENCE)
   */
  @Query(value = "Select nextval(pg_get_serial_sequence('users', 'id')) as id", nativeQuery = true)
  int nextID();

  JpaUser findByUsername(String username);

}
