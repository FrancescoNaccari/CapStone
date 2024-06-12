package nextDevs.CapstonebackEnd.service;

import com.cloudinary.Cloudinary;
import it.nextdevs.EpicEnergyServices.dto.ClienteDto;
import it.nextdevs.EpicEnergyServices.exception.NotFoundException;
import it.nextdevs.EpicEnergyServices.model.Cliente;
import it.nextdevs.EpicEnergyServices.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private JavaMailSenderImpl javaMailSender;

    @Autowired
    private Cloudinary cloudinary;

    public Integer salvaCliente(ClienteDto clienteDto) {
        Cliente cliente = new Cliente();
        cliente.setNomeContatto(clienteDto.getNomeContatto());
        cliente.setEmail(clienteDto.getEmail());
        cliente.setDataInserimento(LocalDate.now());
        cliente.setPartitaIVA(clienteDto.getPartitaIVA());
        cliente.setTipoSocieta(clienteDto.getTipoSocieta());
        cliente.setRagioneSociale(clienteDto.getRagioneSociale());

        clienteRepository.save(cliente);
        sendMailRegistrazione((cliente.getEmail()));

        return cliente.getId();
    }

    public List<Cliente> getAllClienti(Map<String, String> allParams) {
        if (allParams.isEmpty()) return clienteRepository.findAll();
        List<Cliente> clienti = clienteRepository.findAll();
        for (Map.Entry<String, String> entry : allParams.entrySet()) {
            if (entry.getKey().equals("fatturatoMin")) {
                clienti = clienti.stream().filter(cliente -> cliente.getFatturatoAnnuale() >= Double.parseDouble(entry.getValue())).toList();
            }
            if (entry.getKey().equals("fatturatoMax")) {
                clienti = clienti.stream().filter(cliente -> cliente.getFatturatoAnnuale() <= Double.parseDouble(entry.getValue())).toList();
            }
            if (entry.getKey().equals("inserimentoMin")) {
                clienti = clienti.stream().filter(cliente -> cliente.getDataInserimento().isAfter(LocalDate.parse(entry.getValue()))).toList();
            }
            if (entry.getKey().equals("inserimentoMax")) {
                clienti = clienti.stream().filter(cliente -> cliente.getDataInserimento().isBefore(LocalDate.parse(entry.getValue()))).toList();
            }
            if (entry.getKey().equals("ultimoContattoMin")) {
                clienti = clienti.stream().filter(cliente -> cliente.getDataUltimoContatto().isAfter(LocalDate.parse(entry.getValue()))).toList();
            }
            if (entry.getKey().equals("ultimoContattoMax")) {
                clienti = clienti.stream().filter(cliente -> cliente.getDataUltimoContatto().isBefore(LocalDate.parse(entry.getValue()))).toList();
            }
            if (entry.getKey().equals("ragioneSociale")) {
                clienti = clienti.stream().filter(cliente -> cliente.getRagioneSociale().contains(entry.getValue())).toList();
            }
            if (entry.getKey().equals("nomeContatto")) {
                clienti = clienti.stream().filter(cliente -> cliente.getRagioneSociale().contains(entry.getValue())).toList();
            }
        }
        return clienti;
    }

    public Optional<Cliente> getClienteById(int id) {
        return clienteRepository.findById(id);
    }

    public Cliente updateCliente(int id, ClienteDto clienteDto) {
        Optional<Cliente> clienteOptional = clienteRepository.findById(id);

        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();
            cliente.setEmail(clienteDto.getEmail());
            cliente.setNomeContatto(clienteDto.getNomeContatto());
            cliente.setPartitaIVA(clienteDto.getPartitaIVA());
            cliente.setTipoSocieta(clienteDto.getTipoSocieta());
            cliente.setRagioneSociale(clienteDto.getRagioneSociale());

            clienteRepository.save(cliente);
            return clienteRepository.save(cliente);
        } else {
            throw new NotFoundException("Cliente con id " + id + " non esiste");
        }
    }

    public String deleteCliente(int id) {
        Optional<Cliente> clienteOptional = clienteRepository.findById(id);

        if (clienteOptional.isPresent()) {
            Cliente cliente = clienteOptional.get();
            clienteRepository.delete(cliente);
            return "Cliente con id " + id + " correttamente eliminato";
        } else {
            throw new NotFoundException("Cliente " + id + " non esiste");
        }
    }

    public Cliente getClienteByEmail(String email) {
        Optional<Cliente> userOptional = clienteRepository.findByEmail(email);

        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            throw new NotFoundException("Cliente con email " + email + " non esiste");
        }

    }

    public Cliente getClienteByNome(String nome) {
        Optional<Cliente> userOptional = clienteRepository.findByNomeContatto(nome);

        if (userOptional.isPresent()) {
            return userOptional.get();
        } else {
            throw new NotFoundException("Cliente con nome " + nome + " non esiste");
        }
    }

    public List<Cliente> getClienteByDataInserimento(LocalDate dataInserimento) {
        return clienteRepository.findAllByDataInserimento(dataInserimento);
    }

    public List<Cliente> getClienteByDataUltimoContatto(LocalDate dataUltContatto) {
        return clienteRepository.findAllByDataUltimoContatto(dataUltContatto);
    }

    public List<Cliente> getClientiOrdinatiPerNome(String order) {
        if (order.equals("ASC")) {
            return clienteRepository.findAllByOrderByNomeContattoAsc();
        } else if (order.equals("DESC")) {
            return clienteRepository.findAllByOrderByNomeContattoDesc();
        } else {
            throw new IllegalArgumentException("Ordine non valido. Deve essere 'ASC' o 'DESC'");
        }
    }

    public List<Cliente> getClientiOrdinatiPerFatturato() {
        return clienteRepository.findAllByOrderByFatturatoAnnualeDesc();
    }

    private void sendMailRegistrazione(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Registrazione Cliente");
        message.setText("Registrazione Cliente avvenuta con successo");

        javaMailSender.send(message);
    }

    public Cliente patchAvatarCliente(Integer id, MultipartFile avatar) throws IOException {
        Optional<Cliente> clienteOptional = getClienteById(id);

        if (clienteOptional.isPresent()) {
            String url = (String) cloudinary.uploader().upload(avatar.getBytes(), Collections.emptyMap()).get("url");
            Cliente cliente = clienteOptional.get();
            cliente.setLogoAziendale(url);
            clienteRepository.save(cliente);
            return cliente;
        } else {
            throw new NotFoundException("Utente con id "+id+" non trovato");
        }
    }

}
