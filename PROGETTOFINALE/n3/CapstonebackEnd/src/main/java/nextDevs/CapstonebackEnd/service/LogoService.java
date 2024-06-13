package nextDevs.CapstonebackEnd.service;

import nextDevs.CapstonebackEnd.dto.LogoDto;
import nextDevs.CapstonebackEnd.model.Logo;
import nextDevs.CapstonebackEnd.repository.LogoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LogoService {

    @Autowired
    private LogoRepository logoRepository;

    public List<Logo> getAllLogos() {
        return logoRepository.findAll();
    }

    public Integer saveLogo(LogoDto logoDto) {
        Logo logo = new Logo();
        logo.setSymbol(logoDto.getSymbol());
        logo.setUrl(logoDto.getUrl());
        Logo savedLogo = logoRepository.save(logo);
        return savedLogo.getId();
    }

}
