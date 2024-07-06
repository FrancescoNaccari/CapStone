package nextDevs.CapstonebackEnd.controller;


import nextDevs.CapstonebackEnd.dto.LogoDto;
import nextDevs.CapstonebackEnd.model.Logo;
import nextDevs.CapstonebackEnd.service.LogoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/logos")
public class LogoController {

    @Autowired
    private LogoService logoService;

    @GetMapping
//    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public List<Logo> getAllLogos() {
        return logoService.getAllLogos();
    }

    @GetMapping("/{symbol}")
//    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    public LogoDto getLogo(@PathVariable String symbol) {
        Optional<Logo> logo = logoService.findBySymbol(symbol);
        if (logo.isPresent()) {
            LogoDto logoDto = new LogoDto();
            logoDto.setSymbol(logo.get().getSymbol());
            logoDto.setUrl(logo.get().getUrl());
            return logoDto;
        } else {
            // Gestisci il caso in cui il logo non sia trovato
            return null;
        }
    }
//    @PostMapping
//    @PreAuthorize("hasAuthority('ADMIN')")
//    public Integer saveLogo(@RequestBody LogoDto logoDto) {
//        return logoService.saveLogo(logoDto);
//    }



    @PostMapping
    @PreAuthorize("hasAuthority('ADMIN')")
    public void saveLogos(@RequestBody List<LogoDto> logos) {
        // Aggiungi log per vedere i dati ricevuti
        System.out.println("Received logos: " + logos);
        logoService.saveLogos(logos);
    }

    @DeleteMapping("/remove-duplicates")
    @PreAuthorize("hasAuthority('ADMIN')")
    public String removeDuplicates() {
        logoService.removeDuplicates();
        return "Duplicates removed";
    }
}