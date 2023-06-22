package ucimsa.realm;

public interface UserService {

  JpaUser findByUsername(String username);

  JpaUser getByUsername(String username);

  void save(User user);
}
