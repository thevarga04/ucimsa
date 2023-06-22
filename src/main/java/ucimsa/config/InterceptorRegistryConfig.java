package ucimsa.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorRegistryConfig implements WebMvcConfigurer {

  private final PrincipalUsernameInterceptor principalUsernameInterceptor;


  @Autowired
  public InterceptorRegistryConfig(PrincipalUsernameInterceptor principalUsernameInterceptor) {
    this.principalUsernameInterceptor = principalUsernameInterceptor;
  }


  @Override
  public void addInterceptors(InterceptorRegistry registry) {
    registry.addInterceptor(principalUsernameInterceptor).addPathPatterns("/api/**");
  }

}
