package ucimsa.text;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ucimsa.realm.UserService;

import java.util.List;
import java.util.Optional;

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
  public List<HeapTextList> getTextsList(String username) {
    final var jpaUser = userService.getByUsername(username);
    final var jpaHeapTextList = heapTextRepo.findByUserId(jpaUser.getId());
    return textMapper.toHeapTextList(jpaHeapTextList);
  }


  @Override
  public HeapText getText(int textId, String username) throws TextNotFoundException {
    final var optionalJpaHeapText = getJpaText(textId, username);
    return optionalJpaHeapText
      .map(textMapper::toHeapText)
      .orElseThrow(() -> new TextNotFoundException(
        "TextId " + textId + " either does not exists or is for user " + username + " inaccessible."
      ));
  }

  @Override
  public HeapTextLines getTextLines(int textId, String username) throws TextNotFoundException {
    final var optionalJpaHeapText = getJpaText(textId, username);
    return optionalJpaHeapText
      .map(textMapper::toHeapTextLines)
      .orElseThrow(() -> new TextNotFoundException(
        "TextId " + textId + " either does not exists or is for user " + username + " inaccessible."
      ));
  }

  @Override
  public Optional<JpaHeapText> getJpaText(int textId, String username) {
    final var jpaUser = userService.getByUsername(username);
    return heapTextRepo.findByIdAndUserId(textId, jpaUser.getId());
  }


  @Override
  public Integer deleteText(int textId, String username) {
    final var jpaUser = userService.getByUsername(username);
    return heapTextRepo.deleteByIdAndUserId(textId, jpaUser.getId());
  }


  @Override
  public HeapText save(HeapTextLines heapTextLines, String username) {
    final var jpaUser = userService.getByUsername(username);
    final var jpaHeapText = textMapper.toJpaHeapText(heapTextLines, jpaUser.getId());
    final var saved = heapTextRepo.saveAndFlush(jpaHeapText);
    return HeapText.builder()
        .id(saved.getId())
        .build();
  }


}
