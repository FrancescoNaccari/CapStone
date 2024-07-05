package nextDevs.CapstonebackEnd.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class TransactionRequest {
    private Integer userId;
    private String symbol;
    private int quantity;
    private BigDecimal price;
}
