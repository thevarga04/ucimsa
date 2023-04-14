package ucimsa.realm;

import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

  private final UserRepo userRepo;
  private final PasswordEncoder passwordEncoder;
  private final RoleService roleService;


  @Autowired
  public UserMapper(UserRepo userRepo, PasswordEncoder passwordEncoder, RoleService roleService) {
    this.userRepo = userRepo;
    this.passwordEncoder = passwordEncoder;
    this.roleService = roleService;
  }


  public User toUser(JpaUser jpaUser) {
    return User.builder()
        .id(jpaUser.getId())
        .username(jpaUser.getUsername())
        .firstname(jpaUser.getFirstname())
        .lastname(jpaUser.getLastname())
        .activated(jpaUser.isActivated())
        .build();
  }

  public JpaUser toJpaUser(User user) {
    final var id = userRepo.nextID();
    final var encodedPassword = passwordEncoder.encode(user.getPassword());
    final var defaultRole = roleService.defaultRole();
    final var roles = Set.of(defaultRole);

    return JpaUser.builder()
        .id(id)
        .username(user.getUsername())
        .firstname(user.getFirstname())
        .lastname(user.getLastname())
        .password(encodedPassword)
        .roles(roles)
        .build();
  }

}
