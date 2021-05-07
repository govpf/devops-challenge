package pf.gov.mystuff;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pf.gov.mystuff.exceptions.GoodNotFoundException;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
public class MyStuffController {
    Logger logger = LoggerFactory.getLogger(MyStuffController.class);
    GoodService service;

    public MyStuffController(GoodService service) {
        this.service = service;
    }

    @GetMapping("goods")
    public List<Good> all() {
        return service.all();
    }

    @GetMapping("goods/{id}")
    public ResponseEntity<Good> good_by_id(@PathVariable Long id) throws GoodNotFoundException {
        return ResponseEntity.ok(service.get_by_id(id).orElseThrow(GoodNotFoundException::new));
    }

    @PutMapping("goods/{id}")
    public ResponseEntity<Good> update(@PathVariable Long id, @RequestBody Good good) throws GoodNotFoundException {
        if( ! service.exists(id)) {
            throw new GoodNotFoundException();
        }

        good.setId(id);
        service.save(good);

        logger.info("Updated good id: {}, name: {}", good.getId(), good.getName());
        return ResponseEntity.ok().body(good);
    }

    @PostMapping("goods")
    public ResponseEntity<Good> add_new_good(@RequestBody Good good) {
        service.save(good);
        logger.info("Added good id: {}, name: {}", good.getId(), good.getName());
        return ResponseEntity.ok().body(good);
    }

    @PostMapping("gen-sample-data")
    public ResponseEntity<List<Good>> add_sample_data() {
        List<Good> sample_data = new ArrayList();

        for (String name : new String[]{"keyboard", "rope", "sword", "wheel"}) {
            Good good = new Good(name);
            service.save(good);
            sample_data.add(good);
        }

        logger.info("Added sample data: {}", sample_data);
        return ResponseEntity.ok().body(sample_data);
    }

    @DeleteMapping("/goods")
    public ResponseEntity<Void> clear() {
        service.clear();
        logger.info("Removed all data");
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("goods/{id}")
    public ResponseEntity<Good> delete_good(@PathVariable Long id) throws GoodNotFoundException {
        if( ! service.exists(id)) {
            throw new GoodNotFoundException();
        }

        service.delete(id);

        logger.info("Deleted good id: {}", id);
        return ResponseEntity.ok().build();
    }
}
