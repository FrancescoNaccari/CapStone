package nextDevs.CapstonebackEnd.service;




import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import nextDevs.CapstonebackEnd.dto.LogoDto;
import nextDevs.CapstonebackEnd.model.Logo;
import nextDevs.CapstonebackEnd.repository.LogoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LogoService {

    @Autowired
    private LogoRepository logoRepository;

    @PersistenceContext
    private EntityManager entityManager;

    public List<Logo> getAllLogos() {
        return logoRepository.findAll();
    }
    public Optional<Logo> findBySymbol(String symbol) {
        return logoRepository.findBySymbol(symbol);
    }


    public void saveLogos(List<LogoDto> logoDtos) {
        List<Logo> logos = logoDtos.stream()
                .map(dto -> {
                    Logo logo = new Logo();
                    logo.setSymbol(dto.getSymbol());
                    logo.setUrl(dto.getUrl());
                    return logo;
                })
                .collect(Collectors.toList());
        // Aggiungi log per vedere i dati prima di salvarli
        System.out.println("Saving logos: " + logos);
        logoRepository.saveAll(logos);
    }

    @Transactional
    public void removeDuplicates() {
        // Query per rimuovere i duplicati
        String deleteQuery = "DELETE FROM logo USING logo l2 WHERE logo.id > l2.id AND logo.symbol = l2.symbol AND logo.url = l2.url";
        entityManager.createNativeQuery(deleteQuery).executeUpdate();
    }
}