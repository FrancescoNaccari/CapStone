package nextDevs.CapstonebackEnd.controller;

import nextDevs.CapstonebackEnd.dto.LogoDto;
import nextDevs.CapstonebackEnd.model.Logo;
import nextDevs.CapstonebackEnd.service.LogoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/logos")
public class LogoController {

    @Autowired
    private LogoService logoService;

    @GetMapping
    public List<Logo> getAllLogos() {
        return logoService.getAllLogos();
    }

    @PostMapping
    public Integer saveLogo(@RequestBody LogoDto logoDto) {
        return logoService.saveLogo(logoDto);
    }
}