package ucimsa.stats;

import java.security.Principal;
import java.util.List;
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
  public ResponseEntity<HttpStatus> saveHit(HitSplitSentences hitSplitSentences, Principal principal) {
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

  @GetMapping("/texts/{textId}")
  public ResponseEntity<List<StatsSplitSentences>> getTextStats(
      @PathVariable("textId") int textId
      , Principal principal
  ) throws TextNotFoundException {
    final var stats = statsService.getTextStats(textId, principal.getName());
    return ResponseEntity.ok(stats);
  }


}
