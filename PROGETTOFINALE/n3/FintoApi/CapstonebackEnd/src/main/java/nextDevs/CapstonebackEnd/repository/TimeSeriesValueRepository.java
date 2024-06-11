package nextDevs.CapstonebackEnd.repository;

import nextDevs.CapstonebackEnd.model.TimeSeriesValue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeSeriesValueRepository extends JpaRepository<TimeSeriesValue, Long> {
}
