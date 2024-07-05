package nextDevs.CapstonebackEnd.controller;

import nextDevs.CapstonebackEnd.dto.LogoBorsaDTO;
import nextDevs.CapstonebackEnd.service.LogoBorsaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/logoborsa")
public class LogoBorsaController {

    @Autowired
    private LogoBorsaService logoBorsaService;

    @GetMapping("/{id}")
    public LogoBorsaDTO getLogoBorsaById(@PathVariable Long id) {
        return logoBorsaService.findById(id);
    }

    @PostMapping
    public LogoBorsaDTO createLogoBorsa(@RequestBody LogoBorsaDTO logoBorsaDTO) {
        return logoBorsaService.save(logoBorsaDTO);
    }

    @PutMapping("/{id}")
    public LogoBorsaDTO updateLogoBorsa(@PathVariable Long id, @RequestBody LogoBorsaDTO logoBorsaDTO) {
        logoBorsaDTO.setId(id);
        return logoBorsaService.save(logoBorsaDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteLogoBorsa(@PathVariable Long id) {
        logoBorsaService.deleteById(id);
    }
}
