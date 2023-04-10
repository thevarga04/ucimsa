package ucimsa.realm;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {

  private final UserMapper userMapper;
  private final UserRepo userRepo;
  private final PasswordEncoder passwordEncoder;


  public UserService(UserMapper userMapper, UserRepo userRepo, PasswordEncoder passwordEncoder) {
    this.userMapper = userMapper;
    this.userRepo = userRepo;
    this.passwordEncoder = passwordEncoder;
  }


  public JpaUser findByUsername(String username) {
    return userRepo.findByUsername(username);
  }

  public void save(User user) {
    final var jpa = userMapper.toJpaUser(user);
    jpa.setId(userRepo.nextID());
    jpa.setPassword(passwordEncoder.encode(user.getPassword()));

    // roles ...

    userRepo.save(jpa);
  }


}
