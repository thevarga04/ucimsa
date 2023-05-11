package ucimsa.stats;

import jakarta.validation.Valid;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/stats")
public class StatsRest {

  private final StatsService statsService;


  @Autowired
  public StatsRest(StatsService statsService) {
    this.statsService = statsService;
  }


  @PostMapping("/splitSentences")
  public ResponseEntity<HttpStatus> saveHit(@Valid StatsSplitSentences statsSplitSentences, Principal principal) {
    statsService.saveStats(statsSplitSentences, principal.getName());
    return ResponseEntity.ok().build();
  }


}
