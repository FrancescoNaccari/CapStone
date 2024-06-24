package nextDevs.CapstonebackEnd.dto;


import lombok.Data;
import nextDevs.CapstonebackEnd.enums.TipoUtente;

@Data
public class UserDataDto {
    private int idUtente;
    private String email;
    private String username;
    private String nome;
    private String cognome;
    private TipoUtente tipoUtente;
    private String avatar;
    private Double  balance= 0.0;;

    private boolean newsletter;
}
