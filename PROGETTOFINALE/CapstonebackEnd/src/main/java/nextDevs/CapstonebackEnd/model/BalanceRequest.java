package nextDevs.CapstonebackEnd.model;

import jakarta.persistence.Entity;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class BalanceRequest {
    private BigDecimal amount;


}
