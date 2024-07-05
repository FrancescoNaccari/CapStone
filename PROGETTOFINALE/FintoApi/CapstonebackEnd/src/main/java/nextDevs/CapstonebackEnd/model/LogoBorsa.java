package nextDevs.CapstonebackEnd.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class LogoBorsa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String url;

    @OneToOne
    @JoinColumn(name = "stock_symbol", referencedColumnName = "symbol")
    private StockList stockList;

}
