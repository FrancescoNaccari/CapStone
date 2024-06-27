package nextDevs.CapstonebackEnd.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
public class Transactions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer userId;
    private String symbol;
    private int quantity;
    private BigDecimal price;
    private String type; // "BUY" or "SELL"
    private LocalDateTime date;
}
