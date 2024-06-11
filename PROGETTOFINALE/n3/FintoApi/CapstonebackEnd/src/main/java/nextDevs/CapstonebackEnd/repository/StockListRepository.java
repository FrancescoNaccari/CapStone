package nextDevs.CapstonebackEnd.repository;

import nextDevs.CapstonebackEnd.model.StockList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockListRepository extends JpaRepository<StockList, String>  {
}
