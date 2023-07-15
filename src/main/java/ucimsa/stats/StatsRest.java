package ucimsa.stats;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/stats")
public class StatsRest {

  private final StatsService statsService;


  @Autowired
  public StatsRest(StatsService statsService) {
    this.statsService = statsService;
  }


  @PostMapping("/splitSentences")
  public ResponseEntity<HttpStatus> saveHit(HitSplitSentences hitSplitSentences, Principal principal) {
    statsService.saveHit(hitSplitSentences, principal.getName());
    return ResponseEntity.ok().build();
  }


  @GetMapping("/lessons/{lessonId}")
  public ResponseEntity<StatsSplitSentences> getLessonStats(
    @PathVariable("lessonId") int lessonId
    , Principal principal
  ) {
    final var stats = statsService.getLessonStats(lessonId, principal.getName());
    return ResponseEntity.ok(stats);
  }

  @GetMapping("/texts/{textId}")
  public ResponseEntity<List<StatsSplitSentences>> getTextStats(
    @PathVariable("textId") int textId
    , Principal principal
  ) {
    final var stats = statsService.getTextStats(textId, principal.getName());
    return ResponseEntity.ok(stats);
  }


}
