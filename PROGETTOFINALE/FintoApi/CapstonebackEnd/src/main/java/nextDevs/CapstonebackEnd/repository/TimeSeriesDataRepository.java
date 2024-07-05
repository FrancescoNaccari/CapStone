package nextDevs.CapstonebackEnd.repository;

import nextDevs.CapstonebackEnd.model.TimeSeriesData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TimeSeriesDataRepository extends JpaRepository<TimeSeriesData, Long> {
    Optional<TimeSeriesData> findBySymbolAndInterval(String symbol, String interval);

}
