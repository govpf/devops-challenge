package pf.gov.mystuff;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
interface GoodsRepository extends JpaRepository<Good, Long> {
}