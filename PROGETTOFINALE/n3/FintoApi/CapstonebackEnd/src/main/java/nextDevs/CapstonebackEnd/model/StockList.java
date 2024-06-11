package nextDevs.CapstonebackEnd.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class StockList {
    @Id
    private String symbol;
    private String name;
    private String currency;
    private String exchange;
    private String mic_code;
    private String country;
    private String type;

    @OneToMany(mappedBy = "stockList", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TimeSeriesData> timeSeriesData;

    @OneToOne(mappedBy = "stockList", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private LogoBorsa logoBorsa;
}
