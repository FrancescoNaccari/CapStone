package nextDevs.CapstonebackEnd.repository;

import it.nextdevs.EpicEnergyServices.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    Optional<Cliente> findByEmail(String email);

    Optional<Cliente> findByNomeContatto(String nome);

    List<Cliente> findAllByDataInserimento(LocalDate dataInserimento);

    List<Cliente> findAllByDataUltimoContatto(LocalDate dataInserimento);

    List<Cliente> findAllByOrderByNomeContattoAsc();

    List<Cliente> findAllByOrderByNomeContattoDesc();

    List<Cliente> findAllByOrderByFatturatoAnnualeDesc();
}
