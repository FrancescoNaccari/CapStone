package nextDevs.CapstonebackEnd.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import nextDevs.CapstonebackEnd.enums.TipoUtente;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue
    @Column(name = "id_utente")
    private int idUtente;
    private String email;
    private String password;
    private String username;
    private String nome;
    private String cognome;
    @Enumerated(EnumType.STRING)
    private TipoUtente tipoUtente;
    private String avatar;
    private String provider;
    @Column(precision = 38, scale = 2)
    private BigDecimal balance= BigDecimal.ZERO;;
    private boolean newsletter;
    private String stripeAccountId;

    @JsonManagedReference

    @OneToMany(mappedBy = "user")
    private List<FavoriteStock> listaFavoriti;

    @JsonManagedReference

    @OneToMany(mappedBy = "user")
    private List<Withdrawal> withdrawals;


    @JsonManagedReference
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Stock> stocks;

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return this.password;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(tipoUtente.name()));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
