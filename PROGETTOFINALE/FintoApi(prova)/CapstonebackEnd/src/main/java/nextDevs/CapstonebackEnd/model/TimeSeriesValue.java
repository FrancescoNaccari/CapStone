package nextDevs.CapstonebackEnd.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class TimeSeriesValue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime datetime;
    private double open;
    private double high;
    private double low;
    private double close;
    private double volume;

    @ManyToOne
    @JoinColumn(name = "time_series_data_id", referencedColumnName = "id")
    private TimeSeriesData timeSeriesData;

}
