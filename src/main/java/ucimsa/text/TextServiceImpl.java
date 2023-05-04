package ucimsa.text;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ucimsa.realm.UserRegistrationException;
import ucimsa.realm.UserService;

@Service
@Transactional
public class TextServiceImpl implements TextService {

  private final UserService userService;
  private final HeapTextRepo heapTextRepo;
  private final TextMapper textMapper;


  @Autowired
  public TextServiceImpl(UserService userService, HeapTextRepo heapTextRepo, TextMapper textMapper) {
    this.userService = userService;
    this.heapTextRepo = heapTextRepo;
    this.textMapper = textMapper;
  }


  @Override
  public List<HeapText> getTexts(String username) throws UserRegistrationException {
    final var jpaUser = userService.getByUsername(username);
    final var jpaHeapTextList = heapTextRepo.findByUserId(jpaUser.getId());
    return textMapper.toHeapTextList(jpaHeapTextList);
  }

  @Override
  public Optional<HeapText> getText(int textId, String username) throws UserRegistrationException {
    return getJpaText(textId, username).map(textMapper::toHeapText);
  }

  @Override
  public Optional<JpaHeapText> getJpaText(int textId, String username) throws UserRegistrationException {
    final var jpaUser = userService.getByUsername(username);
    return heapTextRepo.findByIdAndUserId(textId, jpaUser.getId());
  }

  @Override
  public Integer deleteText(int textId, String username) throws UserRegistrationException {
    final var jpaUser = userService.getByUsername(username);
    return heapTextRepo.deleteByIdAndUserId(textId, jpaUser.getId());
  }


  @Override
  public HeapText save(HeapText heapText, String username) throws UserRegistrationException {
    final var jpaUser = userService.getByUsername(username);
    final var jpaHeapText = textMapper.toJpaHeapText(heapText, jpaUser.getId());
    final var saved = heapTextRepo.saveAndFlush(jpaHeapText);
    return HeapText.builder()
        .id(saved.getId())
        .build();
  }


}
