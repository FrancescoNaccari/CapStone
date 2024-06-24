package nextDevs.CapstonebackEnd.dto;


import lombok.Data;
import nextDevs.CapstonebackEnd.enums.TipoUtente;

import java.math.BigDecimal;

@Data
public class UserDataDto {
    private int idUtente;
    private String email;
    private String username;
    private String nome;
    private String cognome;
    private TipoUtente tipoUtente;
    private String avatar;
    private BigDecimal balance;;

    private boolean newsletter;
}
