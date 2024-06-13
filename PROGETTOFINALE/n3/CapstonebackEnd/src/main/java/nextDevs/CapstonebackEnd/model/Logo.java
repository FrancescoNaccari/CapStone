package nextDevs.CapstonebackEnd.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Logo {
    @Id
    @GeneratedValue
    private int id;
    private String symbol;
    private String url;
}
