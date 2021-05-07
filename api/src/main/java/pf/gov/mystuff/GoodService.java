package pf.gov.mystuff;

import com.sun.org.apache.xpath.internal.operations.Bool;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class GoodService {
    private GoodsRepository repository;

    public List<Good> all() {
        return repository.findAll();
    }

    public Optional<Good> get_by_id(Long id) {
        return repository.findById(id);
    }

    public Boolean exists(Long id) {
        return repository.existsById(id);
    }

    public void save(Good good) {
        repository.save(good);
    }

    public void clear() {
        repository.deleteAll();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
