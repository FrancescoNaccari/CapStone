package nextDevs.CapstonebackEnd.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class TimeSeriesData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String symbol;
    private String interval;
    private String currency;
    private String exchange_timezone;
    private String exchange;
    private String mic_code;
    private String type;

    @ManyToOne
    @JoinColumn(name = "stock_symbol", referencedColumnName = "symbol")
    private StockList stockList;

    @OneToMany(mappedBy = "timeSeriesData", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TimeSeriesValue> timeSeriesValues;

    // Aggiungi metodi helper per aggiungere TimeSeriesValue
    public void addTimeSeriesValue(TimeSeriesValue value) {
        value.setTimeSeriesData(this);
        this.timeSeriesValues.add(value);
    }

}
