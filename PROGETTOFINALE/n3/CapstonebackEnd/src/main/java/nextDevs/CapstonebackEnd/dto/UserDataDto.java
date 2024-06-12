package it.nextdevs.EpicEnergyServices.dto;

import it.nextdevs.EpicEnergyServices.enums.TipoUtente;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

@Data
public class UserDataDto {
    private int idUtente;
    private String email;
    private String username;
    private String nome;
    private String cognome;
    private TipoUtente tipoUtente;
    private String avatar;
}
