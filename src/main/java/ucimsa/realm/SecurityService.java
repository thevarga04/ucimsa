package ucimsa.realm;

import java.util.Optional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class SecurityService {


//  private final UserDetailsServiceImpl userDetailsService;
//  private final SecurityContextRepository securityContextRepository;
//
//
//  public SecurityService(UserDetailsServiceImpl userDetailsService, SecurityContextRepository securityContextRepository) {
//    this.userDetailsService = userDetailsService;
//    this.securityContextRepository = securityContextRepository;
//  }


  /**
   * Spring Security is fundamentally thread-bound, because it needs to make the current authenticated
   * principal available to a wide variety of downstream consumers. The basic building block is the
   * SecurityContext, which may contain an Authentication (and when a user is logged in it is an
   * Authentication that is explicitly authenticated). You can always access and manipulate the
   * SecurityContext through static convenience methods in SecurityContextHolder, which, in turn,
   * manipulate a ThreadLocal.
   */
  public Optional<String> getCurrentUserLogin() {
    final var securityContext = SecurityContextHolder.getContext();
    final var authentication = securityContext.getAuthentication();
    if (authentication != null) {
      if (authentication.getPrincipal() instanceof final UserDetails userDetails) {
        return Optional.of(userDetails.getUsername());

      } else if (authentication.getPrincipal() instanceof final String userLogin) {
        return Optional.of(userLogin);

      }
    }
    return Optional.empty();
  }


//  @Transactional
//  public void autoLogin(String username, String password, HttpServletRequest request, HttpServletResponse response) {
//    final var userDetails = userDetailsService.loadUserByUsername(username);
//    final var authentication = new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
//    final var securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();
//    final var securityContext = securityContextHolderStrategy.createEmptyContext();
//    securityContext.setAuthentication(authentication);
//    securityContextHolderStrategy.setContext(securityContext);
//
//    securityContextRepository.saveContext(securityContext, request, response);
//  }


}
