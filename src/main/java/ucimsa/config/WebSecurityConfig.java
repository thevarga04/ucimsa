package ucimsa.config;

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


  @Bean
  @Order(1)
  public SecurityFilterChain filterChainApi(HttpSecurity http) throws Exception {
    return http
        .csrf()

        .and()
        .cors()

        .and()
        .securityMatcher(antMatcher("/api/**"))
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
            .requestMatchers(HttpMethod.POST, "/pub/registration", "/pub/login").permitAll()
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
        .securityMatcher("/", "/home", "/registration", "/login", "/logout", "/texts/**")
        .authorizeHttpRequests(auth -> auth
            .requestMatchers(HttpMethod.GET, "/", "/home", "/registration", "/login", "/logout")
            .permitAll()
            .requestMatchers(HttpMethod.GET, "/texts/**")
            .authenticated()
            .anyRequest()
            .denyAll()
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
