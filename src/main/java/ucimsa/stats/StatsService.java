package ucimsa.stats;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ucimsa.learn.OptionsRepo;
import ucimsa.realm.UserService;
import ucimsa.text.TextNotFoundException;
import ucimsa.text.TextService;

@Service
@Transactional
public class StatsService {

  private final UserService userService;
  private final StatsMapper statsMapper;
  private final StatsRepo statsRepo;
  private final TextService textService;
  private final OptionsRepo optionsRepo;


  @Autowired
  public StatsService(UserService userService, StatsMapper statsMapper, StatsRepo statsRepo, TextService textService,
      OptionsRepo optionsRepo) {
    this.userService = userService;
    this.statsMapper = statsMapper;
    this.statsRepo = statsRepo;
    this.textService = textService;
    this.optionsRepo = optionsRepo;
  }


  public void saveHit(HitSplitSentences hitSplitSentences, String username) {
    final var jpaUser = userService.getByUsername(username);
    final var jpaHit = statsMapper.toJpa(hitSplitSentences, jpaUser.getId());
    statsRepo.save(jpaHit);

  }


  public StatsSplitSentences getLessonStats(int lessonId, String username) throws TextNotFoundException {
    final var jpaUser = userService.getByUsername(username);
    final var jpaHits = statsRepo.getByUserIdAndLessonId(jpaUser.getId(), lessonId);
    if (jpaHits.isEmpty()) {
      return null;
    }
    final var jpaHit = jpaHits.get(0);
    final var heapText = textService.getText(jpaHit.getTextId(), username, false);
    final var jpaLesson = optionsRepo.getReferenceById(jpaHit.getLessonId());
    return statsMapper.toStatsList(heapText, jpaLesson, jpaHits);
  }


}
