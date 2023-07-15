package ucimsa.learn;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ucimsa.realm.UserService;

@Component
public class OptionsServiceImpl implements OptionsService {

  private final UserService userService;
  private final OptionsMapper optionsMapper;
  private final OptionsRepo optionsRepo;


  @Autowired
  public OptionsServiceImpl(UserService userService, OptionsMapper optionsMapper, OptionsRepo optionsRepo) {
    this.userService = userService;
    this.optionsMapper = optionsMapper;
    this.optionsRepo = optionsRepo;
  }


  @Override
  public void save(OptionsSplitSentences options, String username) {
    final var jpaUser = userService.getByUsername(username);
    final var jpaOptions = optionsMapper.toJpa(options, jpaUser.getId());
    optionsRepo.save(jpaOptions);
  }

}
