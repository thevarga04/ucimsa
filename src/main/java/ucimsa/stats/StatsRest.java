package ucimsa.stats;

import jakarta.validation.Valid;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ucimsa.text.TextNotFoundException;

@RestController
@RequestMapping("/api/stats")
public class StatsRest {

  private final StatsService statsService;


  @Autowired
  public StatsRest(StatsService statsService) {
    this.statsService = statsService;
  }


  @PostMapping("/splitSentences")
  public ResponseEntity<HttpStatus> saveHit(@Valid HitSplitSentences hitSplitSentences, Principal principal) {
    statsService.saveHit(hitSplitSentences, principal.getName());
    return ResponseEntity.ok().build();
  }


  @GetMapping("/lessons/{lessonId}")
  public ResponseEntity<StatsSplitSentences> getLessonStats(
      @PathVariable("lessonId") int lessonId
      , Principal principal
  ) throws TextNotFoundException {
    final var stats = statsService.getLessonStats(lessonId, principal.getName());
    return ResponseEntity.ok(stats);
  }


}
