package ucimsa.realm;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ucimsa.common.ObjectMapper;

@Service
public class LoginUserDetailsService implements UserDetailsService {

  private final UserRepo userRepo;
  private final ObjectMapper objectMapper;


  public LoginUserDetailsService(UserRepo userRepo, ObjectMapper objectMapper) {
    this.userRepo = userRepo;
    this.objectMapper = objectMapper;
  }


  @Override
  @Transactional(readOnly = true)
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    final var jpaUser = userRepo.findByUsername(username);
    if (jpaUser == null) {
      throw new UsernameNotFoundException("Username not found.");
    }

    return User.builder()
        .username(jpaUser.getUsername())
        .password(jpaUser.getPassword())
        .authorities(objectMapper.ofNullable(jpaUser.getRoles())
            .map(role -> new SimpleGrantedAuthority(role.getName()))
            .toList()
        )
        .build();
  }

}
