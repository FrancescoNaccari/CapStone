package nextDevs.CapstonebackEnd.model;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class NewsletterSubscription {

    @Id
    @GeneratedValue
    private Integer id;

    private String titolo;
    @Lob
    @Column(name = "testo", columnDefinition = "TEXT")
    private String testo;


}