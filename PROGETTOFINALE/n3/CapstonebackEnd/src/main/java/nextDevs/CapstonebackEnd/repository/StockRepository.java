package nextDevs.CapstonebackEnd.repository;

import nextDevs.CapstonebackEnd.model.Stock;
import nextDevs.CapstonebackEnd.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StockRepository extends JpaRepository<Stock, Long> {
    Optional<Stock> findByUserAndSymbol(User user, String symbol);
    List<Stock> findByUser_IdUtente(int userId);
}


