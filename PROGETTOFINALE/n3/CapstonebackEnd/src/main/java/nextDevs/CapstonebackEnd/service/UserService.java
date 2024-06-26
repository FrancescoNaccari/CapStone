package nextDevs.CapstonebackEnd.service;

import com.cloudinary.Cloudinary;

import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.Transfer;
import com.stripe.param.AccountCreateParams;
import nextDevs.CapstonebackEnd.dto.UpdatePasswordDto;
import nextDevs.CapstonebackEnd.dto.UserDataDto;
import nextDevs.CapstonebackEnd.dto.UserDto;
import nextDevs.CapstonebackEnd.enums.TipoUtente;
import nextDevs.CapstonebackEnd.exception.BadRequestException;
import nextDevs.CapstonebackEnd.exception.NotFoundException;
import nextDevs.CapstonebackEnd.exception.UserNotFoundException;
import nextDevs.CapstonebackEnd.model.User;
import nextDevs.CapstonebackEnd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private JavaMailSenderImpl javaMailSender;

    public Integer saveUser(UserDto userDto) {
        if (getUserByEmail(userDto.getEmail()).isEmpty()) {
            User user = new User();
            user.setNome(userDto.getNome());
            user.setCognome(userDto.getCognome());
            user.setUsername(userDto.getUsername());
            user.setEmail(userDto.getEmail());
            user.setTipoUtente(TipoUtente.USER);
            user.setNewsletter(false);
            user.setBalance(BigDecimal.ZERO);
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));

            // Creare un account Stripe per l'utente con le capacità necessarie
            try {
                AccountCreateParams.Capabilities capabilities = AccountCreateParams.Capabilities.builder()
                        .setCardPayments(AccountCreateParams.Capabilities.CardPayments.builder().setRequested(true).build())
                        .setTransfers(AccountCreateParams.Capabilities.Transfers.builder().setRequested(true).build())
                        .build();

                AccountCreateParams params = AccountCreateParams.builder()
                        .setType(AccountCreateParams.Type.CUSTOM)
                        .setCountry("IT")
                        .setEmail(userDto.getEmail())
                        .setCapabilities(capabilities)
                        .build();
                Account account = Account.create(params);
                user.setStripeAccountId(account.getId());
            } catch (StripeException e) {
                throw new RuntimeException("Failed to create Stripe account: " + e.getMessage());
            }

            userRepository.save(user);
            sendMailRegistrazione(userDto.getEmail());
            // Log l'ID dell'account Stripe
            System.out.println("User created with Stripe account ID: " + user.getStripeAccountId());

            return user.getIdUtente();
        } else {
            throw new BadRequestException("L'utente con email " + userDto.getEmail() + " già esistente");
        }
    }

    public Page<User> getAllUsers(int page, int size , String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return userRepository.findAll(pageable);
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public User updateUser(int id, UserDto userDto) {
        Optional<User> userOptional = getUserById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setNome(userDto.getNome());
            user.setCognome(userDto.getCognome());
            user.setUsername(userDto.getUsername());
            user.setEmail(userDto.getEmail());
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            return userRepository.save(user);
        } else {
            throw new NotFoundException("User with id:" + id + " not found");
        }
    }

    public String deleteUser(int id) {
        Optional<User> userOptional = getUserById(id);

        if (userOptional.isPresent()) {
            userRepository.delete(userOptional.get());
            return "User with id:" + id + " correctly deleted";
        } else {
            throw new NotFoundException("User with id:" + id + " not found");
        }
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserDataDto patchUser(Integer id, UserDto userDto) {
        Optional<User> userOptional = getUserById(id);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (userDto.getUsername() != null) {
                user.setUsername(userDto.getUsername());
            }
            if (userDto.getPassword() != null) {
                user.setPassword(passwordEncoder.encode(userDto.getPassword()));
            }
            if (userDto.getNome() != null) {
                user.setNome(userDto.getNome());
            }
            if (userDto.getCognome() != null) {
                user.setCognome(userDto.getCognome());
            }
            if (userDto.getEmail() != null) {
                user.setEmail(userDto.getEmail());
            }
            if (userDto.getAvatar() != null) {
                user.setAvatar(userDto.getAvatar());
            }
            if (userDto.getStripeAccountId() != null) {
                user.setStripeAccountId(userDto.getStripeAccountId());
            }
            userRepository.save(user);
            // Log l'ID dell'account Stripe aggiornato
            System.out.println("User updated with Stripe account ID: " + user.getStripeAccountId());

            UserDataDto userDataDto = new UserDataDto();
            userDataDto.setNome(user.getNome());
            userDataDto.setCognome(user.getCognome());
            userDataDto.setAvatar(user.getAvatar());
            userDataDto.setEmail(user.getEmail());
            userDataDto.setNewsletter(user.isNewsletter());
            userDataDto.setUsername(user.getUsername());
            userDataDto.setIdUtente(user.getIdUtente());
            userDataDto.setTipoUtente(user.getTipoUtente());
            userDataDto.setBalance(user.getBalance());
            userDataDto.setStripeAccountId(user.getStripeAccountId());
            return userDataDto;
        } else {
            throw new NotFoundException("Utente con id "+id+" non trovato");
        }
    }

    public UserDataDto patchAvatarUser(Integer id, MultipartFile avatar) throws IOException {
        Optional<User> userOptional = getUserById(id);

        if (userOptional.isPresent()) {
            String url = (String) cloudinary.uploader().upload(avatar.getBytes(), Collections.emptyMap()).get("url");
            User user = userOptional.get();
            user.setAvatar(url);
            userRepository.save(user);
            UserDataDto userDataDto = new UserDataDto();
            userDataDto.setNome(user.getNome());
            userDataDto.setCognome(user.getCognome());
            userDataDto.setAvatar(user.getAvatar());
            userDataDto.setEmail(user.getEmail());
            userDataDto.setUsername(user.getUsername());
            userDataDto.setIdUtente(user.getIdUtente());
            userDataDto.setTipoUtente(user.getTipoUtente());
            userDataDto.setBalance(user.getBalance());
            userDataDto.setStripeAccountId(user.getStripeAccountId());
            return userDataDto;
        } else {
            throw new NotFoundException("Utente con id "+id+" non trovato");
        }
    }

    private void sendMailRegistrazione(String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Registrazione Utente");
        message.setText("Registrazione Utente avvenuta con successo");

        javaMailSender.send(message);
    }

    public void updatePassword(int id, UpdatePasswordDto updatePasswordDto) {
        Optional<User> userOptional = getUserById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (!passwordEncoder.matches(updatePasswordDto.getCurrentPassword(), user.getPassword())) {
                throw new BadRequestException("La password attuale non è corretta");
            }
            user.setPassword(passwordEncoder.encode(updatePasswordDto.getNewPassword()));
            userRepository.save(user);
        } else {
            throw new NotFoundException("User con id: " + id + " non trovato");
        }
    }


    public User updateNewsletterPreference(Integer id, Boolean newsletter) {
        User user = userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
        user.setNewsletter(newsletter);
        return userRepository.save(user);
    }

    public User updateBalance(Integer userId, BigDecimal amount) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            BigDecimal currentBalance = user.getBalance() != null ? user.getBalance() : BigDecimal.ZERO;
            BigDecimal newBalance = currentBalance.add(amount);
            user.setBalance(newBalance);
            userRepository.save(user);
            System.out.println("Updated balance for user " + userId + ": " + newBalance);
            return user;
        } else {
            throw new RuntimeException("User not found");
        }
    }


    public User withdrawFunds(Integer userId, BigDecimal amount) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            BigDecimal currentBalance = user.getBalance() != null ? user.getBalance() : BigDecimal.ZERO;

            if (currentBalance.compareTo(amount) < 0) {
                throw new BadRequestException("Insufficient funds");
            }
            if (user.getStripeAccountId() == null || user.getStripeAccountId().isEmpty()) {
                throw new RuntimeException("Stripe account ID is missing for user " + user.getIdUtente());
            }
            BigDecimal newBalance = currentBalance.subtract(amount);
            user.setBalance(newBalance);
            userRepository.save(user);
            // Implementa la logica per trasferire i fondi all'utente (es. integrazione con un servizio di pagamento)
            processWithdrawal(user, amount);
            return user;
        } else {
            throw new RuntimeException("User not found");
        }
    }

    private void processWithdrawal(User user, BigDecimal amount) {
        // Implementa l'integrazione con il servizio di pagamento per processare il prelievo
        try {
            String stripeAccountId = user.getStripeAccountId();
            if (stripeAccountId == null || stripeAccountId.isEmpty()) {
                throw new RuntimeException("Stripe account ID is missing for user " + user.getIdUtente());
            }

            // Log il valore di stripeAccountId
            System.out.println("Processing withdrawal for user " + user.getIdUtente() + " with Stripe account ID " + stripeAccountId);


            Map<String, Object> transferParams = new HashMap<>();
            transferParams.put("amount", amount.multiply(BigDecimal.valueOf(100)).intValue()); // Converti l'importo in centesimi
            transferParams.put("currency", "eur");
            transferParams.put("destination", stripeAccountId); // ID dell'account Stripe del destinatario

            Transfer transfer = Transfer.create(transferParams);

            // Logga l'operazione di prelievo
            logWithdrawal(user, amount);

            // Notifica all'utente via email
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getEmail());
            message.setSubject("Withdrawal Request");
            message.setText("Your withdrawal request for amount " + amount + " has been processed. Transaction ID: " + transfer.getId());
            javaMailSender.send(message);

        } catch (StripeException e) {
            throw new RuntimeException("Stripe transfer failed: " + e.getMessage());
        }
    }

    private void logWithdrawal(User user, BigDecimal amount) {
        // Logga l'operazione di prelievo per scopi di auditing
        System.out.println("User " + user.getIdUtente() + " requested withdrawal of amount " + amount);
    }
}
