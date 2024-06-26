package nextDevs.CapstonebackEnd.model;


import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Stock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String symbol;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}