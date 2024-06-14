package nextDevs.CapstonebackEnd.repository;


import nextDevs.CapstonebackEnd.model.Logo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LogoRepository extends JpaRepository<Logo,Integer> {
    Optional<Logo> findBySymbol(String symbol);
}
