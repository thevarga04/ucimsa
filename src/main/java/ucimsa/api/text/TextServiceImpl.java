package ucimsa.api.text;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ucimsa.realm.UserService;
import ucimsa.realm.UserValidatorException;

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
  public List<HeapText> getTexts(String username) throws UserValidatorException {
    final var jpaUser = userService.getByUsername(username);
    final var jpaHeapTextList = heapTextRepo.findByUserId(jpaUser.getId());
    return textMapper.toHeapTextList(jpaHeapTextList);
  }

  @Override
  public Optional<HeapText> getText(int id, String username) throws UserValidatorException {
    final var jpaUser = userService.getByUsername(username);
    final var jpaHeapText = heapTextRepo.findByIdAndUserId(id, jpaUser.getId());
    return jpaHeapText.map(textMapper::toHeapText);
  }

  @Override
  public Integer deleteText(int id, String username) throws UserValidatorException {
    final var jpaUser = userService.getByUsername(username);
    return heapTextRepo.deleteByIdAndUserId(id, jpaUser.getId());
  }


  @Override
  public HeapText save(HeapText heapText, String username) throws UserValidatorException {
    final var jpaUser = userService.getByUsername(username);
    final var jpaHeapText = textMapper.toJpaHeapText(heapText, jpaUser.getId());
    final var saved = heapTextRepo.saveAndFlush(jpaHeapText);
    return HeapText.builder()
        .id(saved.getId())
        .build();
  }


}
