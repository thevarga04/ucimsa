package ucimsa.learn;

import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class LessonRepo {

  private final EntityManager entityManager;


  @Autowired
  public LessonRepo(EntityManager entityManager) {
    this.entityManager = entityManager;
  }


  public int nextLessonId() {
    final var lessonId = entityManager.createNativeQuery("SELECT nextval('seq_lessons')")
        .getSingleResult()
        .toString();
    return Integer.parseInt(lessonId);
  }


}
