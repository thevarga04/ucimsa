package ucimsa.config;

import static org.springframework.util.ObjectUtils.isEmpty;
import static ucimsa.common.ApplicationConstants.EMAIL_REGEX_PATTERN;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
public class PrincipalUsernameInterceptor implements HandlerInterceptor {


  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    final var principal = request.getUserPrincipal();
    if (isEmpty(principal) || isEmpty(principal.getName())) {
      throw new BadCredentialsException("Provided empty or null username.");
    }

    if (!EMAIL_REGEX_PATTERN.matcher(principal.getName()).matches()) {
      throw new BadCredentialsException("Provided email (username) is not a valid email.");
    }

    return HandlerInterceptor.super.preHandle(request, response, handler);
  }


}
