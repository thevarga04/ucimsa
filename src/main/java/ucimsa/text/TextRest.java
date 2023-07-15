package ucimsa.text;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/texts")
public class TextRest {

  private final TextService textService;


  @Autowired
  public TextRest(TextService textService) {
    this.textService = textService;
  }


  @GetMapping
  public ResponseEntity<List<HeapTextList>> getTexts(Principal principal) {
    final var texts = textService.getTextsList(principal.getName());
    return ResponseEntity.ok(texts);
  }


  @GetMapping("/heapText/{textId}")
  public ResponseEntity<HeapTextLines> getHeapTextLines(@PathVariable("textId") int textId, Principal principal) throws TextNotFoundException {
    final var text = textService.getTextLines(textId, principal.getName());
    return ResponseEntity.ok(text);
  }

  @DeleteMapping("/heapText/{textId}")
  public ResponseEntity<Integer> deleteHeapText(@PathVariable("textId") int textId, Principal principal) {
    final var deleted = textService.deleteText(textId, principal.getName());
    return ResponseEntity.ok(deleted);
  }


  @PostMapping("/heapText")
  public ResponseEntity<HeapText> saveHeapText(HeapTextLines heapTextLines, Principal principal) {
    final var savedHeapText = textService.save(heapTextLines, principal.getName());
    return ResponseEntity.ok(savedHeapText);
  }

}
