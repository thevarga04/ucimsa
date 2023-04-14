package ucimsa.realm;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RoleService {

  private static final String DEFAULT_ROLE_NAME = "ROLE_USER";


  public JpaRole defaultRole() {
    return JpaRole.builder()
        .name(DEFAULT_ROLE_NAME)
        .build();
  }

}
