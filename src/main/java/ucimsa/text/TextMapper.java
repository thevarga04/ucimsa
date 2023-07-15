package ucimsa.text;

import java.util.List;

public interface TextMapper {

  List<HeapTextList> toHeapTextList(List<JpaHeapText> jpaHeapTextList);

  HeapTextList toHeapTextList(JpaHeapText jpaHeapText);

  HeapText toHeapText(JpaHeapText jpaHeapText);

  HeapTextLines toHeapTextLines(JpaHeapText jpaHeapText);

  JpaHeapText toJpaHeapText(HeapTextLines heapTextLines, int userId);

}
