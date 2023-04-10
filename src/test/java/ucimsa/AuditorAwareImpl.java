package ucimsa;

import java.util.Optional;
import org.springframework.data.domain.AuditorAware;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class AuditorAwareImpl implements AuditorAware<String > {

  @Override
  @NonNull
  public Optional<String> getCurrentAuditor() {
    final var principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    if (principal instanceof UserDetails userDetails) {
      return Optional.of(userDetails.getUsername());
    }
    return Optional.empty();
  }

}
