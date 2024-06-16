package nextDevs.CapstonebackEnd.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class NewsletterSubscription {

    @Id
    @GeneratedValue
    private Integer id;

    private String titolo;
    private String testo;


}