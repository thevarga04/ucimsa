package ucimsa.realm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ucimsa.common.ObjectValidator;

@Service
@Transactional
public class UserService {

  private final UserRepo userRepo;
  private final UserMapper userMapper;
  private final ObjectValidator objectValidator;


  @Autowired
  public UserService(UserRepo userRepo, UserMapper userMapper, ObjectValidator objectValidator) {
    this.userRepo = userRepo;
    this.userMapper = userMapper;
    this.objectValidator = objectValidator;
  }


  public JpaUser findByUsername(String username) {
    return userRepo.findByUsername(username);
  }

  public JpaUser getByUsername(String username) {
    final var jpaUser = userRepo.findByUsername(username);
    objectValidator.validateExists(jpaUser, username);
    return jpaUser;
  }

  public void save(User user) {
    final var jpa = userMapper.toJpaUser(user);
    userRepo.saveAndFlush(jpa);
  }


}
