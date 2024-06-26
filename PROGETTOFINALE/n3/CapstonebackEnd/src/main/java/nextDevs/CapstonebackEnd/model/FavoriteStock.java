package nextDevs.CapstonebackEnd.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class FavoriteStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "user_id")
    private User user;
    private String symbol;
    private String name;
    private Double price;
    private Boolean increased;
    private String logoUrl;
}
