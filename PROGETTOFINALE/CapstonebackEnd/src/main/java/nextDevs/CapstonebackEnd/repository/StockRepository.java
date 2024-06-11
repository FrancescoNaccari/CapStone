package nextDevs.CapstonebackEnd.repository;

import nextDevs.CapstonebackEnd.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockRepository extends JpaRepository<Stock, Integer> {
    List<Stock> findBySymbol(String symbol);
}
