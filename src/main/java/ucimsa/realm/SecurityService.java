package ucimsa.realm;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class SecurityService {

  private final UserDetailsServiceImpl userDetailsService;
  private final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder.getContextHolderStrategy();


  @Autowired
  public SecurityService(UserDetailsServiceImpl userDetailsService) {
    this.userDetailsService = userDetailsService;
  }


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


  @Transactional
  public void login(
      User user
      , HttpServletRequest request
      , HttpServletResponse response
      , AuthenticationManager authenticationManager
      , SecurityContextRepository securityContextRepository
  ) {
    final var token = UsernamePasswordAuthenticationToken.unauthenticated(user.getUsername(), user.getPassword());
    final var authentication = authenticationManager.authenticate(token);
    final var context = securityContextHolderStrategy.createEmptyContext();
    context.setAuthentication(authentication);
    securityContextHolderStrategy.setContext(context);
    securityContextRepository.saveContext(context, request, response);
  }

}
