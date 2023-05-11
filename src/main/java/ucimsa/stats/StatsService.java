package ucimsa.stats;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ucimsa.realm.UserService;

@Service
public class StatsService {

  private final UserService userService;
  private final StatsMapper statsMapper;
  private final StatsRepo statsRepo;


  @Autowired
  public StatsService(UserService userService, StatsMapper statsMapper, StatsRepo statsRepo) {
    this.userService = userService;
    this.statsMapper = statsMapper;
    this.statsRepo = statsRepo;
  }


  public void saveStats(StatsSplitSentences statsSplitSentences, String username) {
    final var jpaUser = userService.getByUsername(username);
    final var jpaHit = statsMapper.toJpaHit(statsSplitSentences, jpaUser.getId());
    statsRepo.save(jpaHit);


  }


}
