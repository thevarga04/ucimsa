package ucimsa.realm;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;

@Component
public class AuthenticationEntryPointLogin implements AuthenticationEntryPoint {

  private final HandlerExceptionResolver handlerExceptionResolver;


  @Autowired
  public AuthenticationEntryPointLogin(HandlerExceptionResolver handlerExceptionResolver) {
    this.handlerExceptionResolver = handlerExceptionResolver;
  }


  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) {
    handlerExceptionResolver.resolveException(request, response, null, authException);
  }
}
