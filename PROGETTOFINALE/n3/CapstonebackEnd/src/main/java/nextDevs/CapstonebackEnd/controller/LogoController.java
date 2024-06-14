package nextDevs.CapstonebackEnd.controller;


import nextDevs.CapstonebackEnd.dto.LogoDto;
import nextDevs.CapstonebackEnd.model.Logo;
import nextDevs.CapstonebackEnd.service.LogoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/logos")
public class LogoController {

    @Autowired
    private LogoService logoService;

    @GetMapping
    @PreAuthorize("hasAuthority('ADMIN, 'USER')")
    public List<Logo> getAllLogos() {
        return logoService.getAllLogos();
    }

//    @PostMapping
//    @PreAuthorize("hasAuthority('ADMIN')")
//    public Integer saveLogo(@RequestBody LogoDto logoDto) {
//        return logoService.saveLogo(logoDto);
//    }



    @PostMapping

    public void saveLogos(@RequestBody List<LogoDto> logos) {
        // Aggiungi log per vedere i dati ricevuti
        System.out.println("Received logos: " + logos);
        logoService.saveLogos(logos);
    }

    @DeleteMapping("/remove-duplicates")
    public String removeDuplicates() {
        logoService.removeDuplicates();
        return "Duplicates removed";
    }
}