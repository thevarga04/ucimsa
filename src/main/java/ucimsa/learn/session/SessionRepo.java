package ucimsa.learn.session;

import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class SessionRepo {

  private final EntityManager entityManager;


  @Autowired
  public SessionRepo(EntityManager entityManager) {
    this.entityManager = entityManager;
  }


  public long getNextSessionId() {
    final var nextSessionId = entityManager.createNativeQuery("SELECT nextval('seq_sessions')")
        .getSingleResult()
        .toString();
    return Long.parseLong(nextSessionId);
  }


}
