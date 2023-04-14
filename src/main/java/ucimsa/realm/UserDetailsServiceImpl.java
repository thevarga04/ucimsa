package ucimsa.realm;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ucimsa.util.StreamUtil;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  private final UserRepo userRepo;


  public UserDetailsServiceImpl(UserRepo userRepo) {
    this.userRepo = userRepo;
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
        .authorities(StreamUtil.ofNullable(jpaUser.getRoles())
            .map(role -> new SimpleGrantedAuthority(role.getName()))
            .toList()
        )
        .build();
  }

}
