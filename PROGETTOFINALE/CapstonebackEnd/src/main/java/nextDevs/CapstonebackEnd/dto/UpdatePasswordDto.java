package nextDevs.CapstonebackEnd.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdatePasswordDto {
    @NotBlank(message = "La password attuale non può essere vuota")
    private String currentPassword;

    @NotBlank(message = "La nuova password non può essere vuota")
    private String newPassword;
}