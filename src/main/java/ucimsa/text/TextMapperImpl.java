package ucimsa.text;

import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Component
@Transactional
public class TextMapperImpl implements TextMapper {

  @Override
  public List<HeapTextList> toHeapTextList(List<JpaHeapText> jpaHeapTextList) {
    return jpaHeapTextList.stream()
      .map(this::toHeapTextList)
      .toList();
  }

  @Override
  public HeapTextList toHeapTextList(JpaHeapText jpa) {
    return HeapTextList.builder()
      .id(jpa.getId())
      .textname(jpa.getName())
      .numberOfSentences(jpa.getSentences().size())
      .build();
  }

  @Override
  public HeapText toHeapText(JpaHeapText jpaHeapText) {
    return HeapText.builder()
      .id(jpaHeapText.getId())
      .textname(jpaHeapText.getName())
      .sentences(toSentenceMutableList(jpaHeapText.getSentences()))
      .build();
  }

  @Override
  public HeapTextLines toHeapTextLines(JpaHeapText jpaHeapText) {
    return HeapTextLines.builder()
      .id(jpaHeapText.getId())
      .textname(jpaHeapText.getName())
      .lines(toStringList(jpaHeapText.getSentences()))
      .build();
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


  @Override
  public JpaHeapText toJpaHeapText(HeapTextLines heapTextLines, int userId) {
    return JpaHeapText.builder()
      .id(heapTextLines.getId())
      .userId(userId)
      .name(heapTextLines.getTextname())
      .sentences(toJpaSentenceList(heapTextLines.getLines()))
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
