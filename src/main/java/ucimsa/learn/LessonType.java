package ucimsa.learn;

import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum LessonType {
  SPLIT_SENTENCES("splitSentences"),
  FIND_MISTAKE("findMistake"),                  // identify wrong words and choose correct ones from given list
  ASSEMBLY_SENTENCE("assemblySentence"),        // shuffled words
  FILL_BLANKS("fillBlanks"),                    // from shuffled letters
  ;

  public final String type;

  private static final Map<String, LessonType> mapOfTypes = new HashMap<>();

  static {
    for (LessonType lessonType : values()) {
      mapOfTypes.put(lessonType.type, lessonType);
    }
  }

  public static LessonType getLessonType(String type) {
    final var lessonType = mapOfTypes.get(type);
    if (lessonType == null) {
      throw new IllegalArgumentException("Invalid type");
    }

    return lessonType;
  }


}
