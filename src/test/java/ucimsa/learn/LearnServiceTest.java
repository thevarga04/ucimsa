package ucimsa.learn;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import ucimsa.realm.UserService;
import ucimsa.text.TextServiceImpl;

@TestInstance(Lifecycle.PER_CLASS)
class LearnServiceTest {

  @Mock
  TextServiceImpl textService;
  @Mock
  LessonRepo lessonRepo;
  @Mock
  OptionsRepo optionsRepo;

  @Mock
  UserService userService;

  OptionsMapper optionsMapper;

  @InjectMocks
  LearnService learnService;


  @BeforeAll
  void init() {
    learnService = new LearnService(textService, lessonRepo, userService, optionsMapper, optionsRepo);
  }


  @ParameterizedTest
  @ValueSource(ints = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100})
  void calculateLimit(int coverage) {
    // Given
    var splits = 5;
    var numberOfSentences = 10;

    // When
    var actual = learnService.calculateLimit(splits, numberOfSentences, coverage);

    // Then
    assertThat(actual)
        .isGreaterThanOrEqualTo(splits);
  }


}