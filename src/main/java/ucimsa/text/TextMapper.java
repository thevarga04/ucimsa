package ucimsa.text;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@Transactional
public class TextMapper {

  public List<HeapText> toHeapTextList(List<JpaHeapText> jpaHeapTextList) {
    return jpaHeapTextList.stream()
        .map(this::toHeapText)
        .toList();
  }

  public HeapText toHeapText(JpaHeapText jpa) {
    return HeapText.builder()
        .id(jpa.getId())
        .textname(jpa.getName())
        .numberOfSentences(jpa.getSentences().size())
        .build();
  }

  public HeapText toHeapText(JpaHeapText jpaHeapText, boolean asLines) {
    final var builder = HeapText.builder()
        .id(jpaHeapText.getId())
        .textname(jpaHeapText.getName());
    if (asLines) {
      builder.lines(toStringList(jpaHeapText.getSentences()));
    } else {
      builder.sentences(toSentenceMutableList(jpaHeapText.getSentences()));
    }
    return builder.build();
  }

  List<String> toStringList(List<JpaSentence> jpaSentenceList) {
    return jpaSentenceList.stream()
        .map(JpaSentence::getLine)
        .toList();
  }

  List<Sentence> toSentenceMutableList(List<JpaSentence> jpaSentenceList) {
    return jpaSentenceList.stream()
        .map(this::toSentence)
        .collect(Collectors.toList());
  }

  Sentence toSentence(JpaSentence jpa) {
    return new Sentence(jpa.getId(), jpa.getLine());
  }


  public JpaHeapText toJpaHeapTextAsLines(HeapText heapText, int userId) {
    return JpaHeapText.builder()
        .id(heapText.getId())
        .userId(userId)
        .name(heapText.getTextname())
        .sentences(toJpaSentenceList(heapText.getLines()))
        .build();
  }

  List<JpaSentence> toJpaSentenceList(List<String> stringList) {
    return stringList.stream()
        .map(string -> JpaSentence.builder()
            .line(string)
            .build())
        .toList();
  }


}
