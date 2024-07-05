package nextDevs.CapstonebackEnd.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;

import jakarta.persistence.Id;
import lombok.Data;

import java.io.Serial;

@Data
@Entity
public class Logo {
    @Id
    @GeneratedValue
    private Integer id;
    private String symbol;
    private String url;
}
