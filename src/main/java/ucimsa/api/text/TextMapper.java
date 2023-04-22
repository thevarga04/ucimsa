package ucimsa.api.text;

import java.util.List;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
public class TextMapper {

  public List<HeapText> toHeapTextList(List<JpaHeapText> jpaHeapTextList, String username) {
    return jpaHeapTextList.stream()
        .map(jpaHeapText -> toHeapText(jpaHeapText, username))
        .toList();
  }

  public HeapText toHeapText(JpaHeapText jpaHeapText, String username) {
    return HeapText.builder()
        .id(jpaHeapText.getId())
        .username(username)
        .textname(jpaHeapText.getName())
        .sentences(jpaHeapText.getSentences())
        .build();
  }


  public JpaHeapText toJpaHeapText(HeapText heapText, int userId) {
    return JpaHeapText.builder()
        .id(heapText.getId())
        .userId(userId)
        .name(heapText.getTextname())
        .sentences(heapText.getSentences())
        .build();
  }


}
