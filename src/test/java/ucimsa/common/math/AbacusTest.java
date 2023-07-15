package ucimsa.common.math;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;
import static ucimsa.common.ApplicationConstants.THOUSAND;

class AbacusTest {

  Abacus sut;


  @BeforeEach
  void init() {
    sut = new Abacus();
  }


  @ParameterizedTest
  @ValueSource(ints = {10, 20, 30, 40, 50, 60, 70, 80, 90, 100})
  void atLeastMinUpToMaxByRatio(int coverage) {
    // Given
    var splits = 5;
    var allSentences = 10;
    var ratio = (float) coverage / THOUSAND;

    // When
    var actual = sut.atLeastMinUpToMaxByRatio(splits, allSentences, ratio);

    // Then
    assertThat(actual)
      .isGreaterThanOrEqualTo(splits);
  }

}
