package ucimsa.stats;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ucimsa.learn.OptionsRepo;
import ucimsa.realm.UserService;
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


  public StatsSplitSentences getLessonStats(int lessonId, String username) {
    final var jpaUser = userService.getByUsername(username);
    final var jpaHits = statsRepo.getByUserIdAndLessonId(jpaUser.getId(), lessonId);
    if (jpaHits.isEmpty()) {
      return null;
    }
    final var jpaHit = jpaHits.get(0);
    final var jpaText = textService.getJpaText(jpaHit.getTextId(), username);
    if (jpaText.isEmpty()) {
      return null;
    }

    final var jpaOptions = optionsRepo.getReferenceById(jpaHit.getLessonId());
    return statsMapper.toStatsList(jpaText.get(), jpaOptions, jpaHits);
  }


  public List<StatsSplitSentences> getTextStats(int textId, String username) {
    final var jpaText = textService.getJpaText(textId, username);
    if (jpaText.isEmpty()) {
      return List.of();
    }

    final var jpaUser = userService.getByUsername(username);
    final var jpaOptionsList = optionsRepo.findByUserIdAndTextId(jpaUser.getId(), textId);

    final var statsSplitSentencesList = new ArrayList<StatsSplitSentences>();
    for (final var jpaOptions : jpaOptionsList) {
      final var jpaHits = statsRepo.getByUserIdAndLessonId(jpaUser.getId(), jpaOptions.getId());
      if (!jpaHits.isEmpty()) {
        statsSplitSentencesList.add(statsMapper.toStatsList(jpaText.get(), jpaOptions, jpaHits));
      }
    }
    return statsSplitSentencesList;
  }


}
