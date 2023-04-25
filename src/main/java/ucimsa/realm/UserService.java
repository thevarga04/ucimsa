package ucimsa.realm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ucimsa.util.ObjectUtil;

@Service
@Transactional
public class UserService {

  private final UserRepo userRepo;
  private final UserMapper userMapper;


  @Autowired
  public UserService(UserRepo userRepo, UserMapper userMapper) {
    this.userRepo = userRepo;
    this.userMapper = userMapper;
  }


  public JpaUser findByUsername(String username) {
    return userRepo.findByUsername(username);
  }

  public JpaUser getByUsername(String username) throws UserValidatorException {
    final var jpaUser = userRepo.findByUsername(username);
    ObjectUtil.validateExists(jpaUser, username);
    return jpaUser;
  }

  public void save(User user) {
    final var jpa = userMapper.toJpaUser(user);
    userRepo.saveAndFlush(jpa);
  }


}
