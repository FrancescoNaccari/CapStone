package nextDevs.CapstonebackEnd.model;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
public class Withdrawal {
    @Id
    @GeneratedValue
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private BigDecimal amount;
    private LocalDateTime requestTime;


}