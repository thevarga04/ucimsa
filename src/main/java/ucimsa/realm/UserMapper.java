package ucimsa.realm;

import org.springframework.stereotype.Component;

@Component
public class UserMapper {

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
    return JpaUser.builder()
        .id(user.getId())
        .username(user.getUsername())
        .firstname(user.getFirstname())
        .lastname(user.getLastname())
        .activated(user.isActivated())
        .build();
  }

}
