package nextDevs.CapstonebackEnd.service;

import nextDevs.CapstonebackEnd.dto.LogoBorsaDTO;
import nextDevs.CapstonebackEnd.model.LogoBorsa;
import nextDevs.CapstonebackEnd.repository.LogoBorsaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LogoBorsaService {

    @Autowired
    private LogoBorsaRepository logoBorsaRepository;

    public LogoBorsaDTO findById(Long id) {
        return logoBorsaRepository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    public LogoBorsaDTO save(LogoBorsaDTO logoBorsaDTO) {
        LogoBorsa logoBorsa = toEntity(logoBorsaDTO);
        return toDTO(logoBorsaRepository.save(logoBorsa));
    }

    public void deleteById(Long id) {
        logoBorsaRepository.deleteById(id);
    }

    private LogoBorsaDTO toDTO(LogoBorsa logoBorsa) {
        LogoBorsaDTO dto = new LogoBorsaDTO();
        dto.setId(logoBorsa.getId());
        dto.setUrl(logoBorsa.getUrl());
        return dto;
    }

    private LogoBorsa toEntity(LogoBorsaDTO dto) {
        LogoBorsa logoBorsa = new LogoBorsa();
        logoBorsa.setId(dto.getId());
        logoBorsa.setUrl(dto.getUrl());
        return logoBorsa;
    }
}
