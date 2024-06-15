package nextDevs.CapstonebackEnd.repository;

import nextDevs.CapstonebackEnd.model.FavoriteStock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface FavoriteStockRepository extends JpaRepository<FavoriteStock,Integer> {
    List<FavoriteStock> findByUser_IdUtente(Integer userId);
}
