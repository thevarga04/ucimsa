package ucimsa.realm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {

  private final UserMapper userMapper;
  private final UserRepo userRepo;


  @Autowired
  public UserService(UserMapper userMapper, UserRepo userRepo) {
    this.userMapper = userMapper;
    this.userRepo = userRepo;
  }


  public JpaUser findByUsername(String username) {
    return userRepo.findByUsername(username);
  }

  public void save(User user) {
    final var jpa = userMapper.toJpaUser(user);
    userRepo.save(jpa);
  }


}
