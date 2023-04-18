package ucimsa.realm;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

  private static final String[] ALLOWED_REALM_URLS = new String[]{"/", "/home", "/registration", "/login", "/logout"};
  private static final String[] ALLOWED_PUB_URLS = new String[]{"/pub/registration", "/pub/login"};

  private final UserDetailsService userDetailsService;
  private final AuthenticationEntryPoint authenticationEntryPoint;


  @Autowired
  public WebSecurityConfig(UserDetailsService userDetailsService, AuthenticationEntryPoint authenticationEntryPoint) {
    this.userDetailsService = userDetailsService;
    this.authenticationEntryPoint = authenticationEntryPoint;
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(HttpSecurity httpSecurity) throws Exception {
    return httpSecurity.getSharedObject(AuthenticationManagerBuilder.class)
        .userDetailsService(userDetailsService)
        .passwordEncoder(passwordEncoder())
        .and().build();
  }

  @Bean
  public CorsRegistry corsRegistry() {
    var corsRegistry = new CorsRegistry();
    corsRegistry.addMapping("/**").allowedMethods("*");
    return corsRegistry;
  }

  /**
   * Rest API under /auth requires authentication (/pub does not),
   * because authentication is required only for endpoints covered by .securityMatcher
   */
  @Bean
  @Order(1)
  public SecurityFilterChain filterChainAuth(HttpSecurity http) throws Exception {
    return http
        .csrf()

        .and()
        .cors()

        .and()
        .securityMatcher(antMatcher("/auth/**"))
        .authorizeHttpRequests(auth -> auth
            .anyRequest().authenticated()
        )

        .build();
  }

  @Bean
  @Order(2)
  public SecurityFilterChain filterChainPub(HttpSecurity http) throws Exception {
    return http
        .csrf()

        .and()
        .cors()

        .and()
        .securityMatcher(antMatcher("/pub/**"))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.POST, ALLOWED_PUB_URLS).permitAll()
            .anyRequest().denyAll()
        )

        .exceptionHandling(exception -> exception
            .authenticationEntryPoint(authenticationEntryPoint)
        )

        .build();
  }


  @Bean
  @Order(3)
  public SecurityFilterChain filterChainMvc(HttpSecurity http) throws Exception {
    return http
        .csrf()

        .and()
        .cors()

        .and()
        .securityMatcher(ALLOWED_REALM_URLS)
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.GET, ALLOWED_REALM_URLS).permitAll()
            .anyRequest().denyAll()
        )

        .formLogin(form -> form
            .loginPage("/login")
        )

        .logout(logout -> logout
            .deleteCookies("JSESSIONID")
            .invalidateHttpSession(true)
            .logoutSuccessUrl("/")
            .permitAll()
        )

        .rememberMe(me -> me
            .key("RememberMeKey")
            .tokenValiditySeconds(86400)
        )

        .sessionManagement(session -> session
            .maximumSessions(1)
        )

        .build();
  }

}
