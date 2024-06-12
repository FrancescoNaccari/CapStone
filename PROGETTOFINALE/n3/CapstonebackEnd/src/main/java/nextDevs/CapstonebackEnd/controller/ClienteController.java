package nextDevs.CapstonebackEnd.controller;

import it.nextdevs.EpicEnergyServices.dto.ClienteDto;
import it.nextdevs.EpicEnergyServices.exception.BadRequestException;
import it.nextdevs.EpicEnergyServices.model.Cliente;
import it.nextdevs.EpicEnergyServices.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping("/clienti")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public Integer salvaCliente(@RequestBody @Validated ClienteDto clienteDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BadRequestException(bindingResult.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage()).reduce("", (s, s2) -> s + s2));
        }
        return clienteService.salvaCliente(clienteDto);
    }


    @GetMapping("/clienti")
    @PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
    public List<Cliente> getAllClienti(@RequestParam Map<String, String> allParams) {
        return clienteService.getAllClienti(allParams);
    }


    @PutMapping("/clienti/{id}")
    @PreAuthorize("hasAnyAuthority('USER','ADMIN')")
    public Cliente updateCliente(@PathVariable int id, @RequestBody @Validated ClienteDto clienteDto, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new BadRequestException(bindingResult.getAllErrors().stream()
                    .map(error -> error.getDefaultMessage()).reduce("", (s, s2) -> s + s2));
        }

        return clienteService.updateCliente(id, clienteDto);
    }

    @DeleteMapping("/clienti/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    public String deleteCliente(@PathVariable int id) {
        return clienteService.deleteCliente(id);
    }

    @GetMapping("/clienti/email/{email}")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public Cliente getClienteByEmail(@PathVariable String email) {
        return clienteService.getClienteByEmail(email);
    }

    @GetMapping("/clienti/nome/{nome}")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public Cliente getClienteByNome(@PathVariable String nome) {
        return clienteService.getClienteByNome(nome);
    }

    @GetMapping("/clienti/dataInserimento/{dataInserimento}")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public List<Cliente> getClienteByDataInserimento(@PathVariable LocalDate dataInserimento) {
        return clienteService.getClienteByDataInserimento(dataInserimento);
    }

    @GetMapping("/clienti/dataUltContatto/{dataUltContatto}")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public List<Cliente> getClienteByDataUltimoContatto(@PathVariable LocalDate dataUltContatto) {
        return clienteService.getClienteByDataUltimoContatto(dataUltContatto);
    }

    @GetMapping("/clienti/ordinatiPerNome/{order}")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public List<Cliente> getClientiOrdinatiPerNome(@PathVariable String order) {
        return clienteService.getClientiOrdinatiPerNome(order);
    }

    @GetMapping("/clienti/ordinatiPerFatturato")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public List<Cliente> getClientiOrdinatiPerFatturato() {
        return clienteService.getClientiOrdinatiPerFatturato();
    }

    @GetMapping("/clienti/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','USER')")
    public Optional<Cliente> getClienteById(@PathVariable int id) {
        return clienteService.getClienteById(id);
    }

    @PatchMapping(value = "/clienti/{id}/logo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Cliente patchAvatarUser(@PathVariable int id, @RequestParam("file") MultipartFile avatar) throws IOException {
        return clienteService.patchAvatarCliente(id, avatar);
    }

}
