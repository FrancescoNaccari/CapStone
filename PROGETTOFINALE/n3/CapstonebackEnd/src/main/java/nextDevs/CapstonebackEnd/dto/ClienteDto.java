package nextDevs.CapstonebackEnd.dto;

import it.nextdevs.EpicEnergyServices.enums.TipoSocieta;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ClienteDto {

    @NotNull
    private String partitaIVA;

    @NotNull
    private String ragioneSociale;

    private String email;


    @NotNull
    private String pec;

    private String telefono;

    private String emailContatto;

    @NotNull
    private String nomeContatto;

    @NotNull
    private String cognomeContatto;

    private String telefonoContatto;

    private TipoSocieta tipoSocieta;


}
