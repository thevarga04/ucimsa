package ucimsa.api.text;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ucimsa.realm.UserValidatorException;

@Service
@Transactional
public class TextServiceImpl implements TextService {

  private final TextMapper textMapper;
  private final HeapTextRepo heapTextRepo;


  @Autowired
  public TextServiceImpl(TextMapper textMapper, HeapTextRepo heapTextRepo) {
    this.textMapper = textMapper;
    this.heapTextRepo = heapTextRepo;
  }


  @Override
  public HeapText save(HeapText heapText, String username) throws UserValidatorException {
    final var jpaHeapText = textMapper.toJpaHeapText(heapText, username);
    final var saved = heapTextRepo.save(jpaHeapText);
    return HeapText.builder()
        .id(saved.getId())
        .build();
  }


}
