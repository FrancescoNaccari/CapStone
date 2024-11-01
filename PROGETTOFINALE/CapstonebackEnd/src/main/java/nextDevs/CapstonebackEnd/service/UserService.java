package nextDevs.CapstonebackEnd.service;

import com.cloudinary.Cloudinary;

import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.Transfer;
import com.stripe.param.AccountCreateParams;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import nextDevs.CapstonebackEnd.dto.UpdatePasswordDto;
import nextDevs.CapstonebackEnd.dto.UserDataDto;
import nextDevs.CapstonebackEnd.dto.UserDto;
import nextDevs.CapstonebackEnd.enums.TipoUtente;
import nextDevs.CapstonebackEnd.exception.BadRequestException;
import nextDevs.CapstonebackEnd.exception.NotFoundException;
import nextDevs.CapstonebackEnd.exception.UserNotFoundException;
import nextDevs.CapstonebackEnd.model.Stock;
import nextDevs.CapstonebackEnd.model.Transaction;
import nextDevs.CapstonebackEnd.model.User;
import nextDevs.CapstonebackEnd.repository.StockRepository;
import nextDevs.CapstonebackEnd.repository.TransactionRepository;
import nextDevs.CapstonebackEnd.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class UserService {

    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private JavaMailSenderImpl javaMailSender;
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

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
//            try {
//                AccountCreateParams.Capabilities capabilities = AccountCreateParams.Capabilities.builder()
//                        .setCardPayments(AccountCreateParams.Capabilities.CardPayments.builder().setRequested(true).build())
//                        .setTransfers(AccountCreateParams.Capabilities.Transfers.builder().setRequested(true).build())
//                        .build();
//
//                AccountCreateParams params = AccountCreateParams.builder()
//                        .setType(AccountCreateParams.Type.CUSTOM)
//                        .setCountry("IT")
//                        .setEmail(userDto.getEmail())
//                        .setCapabilities(capabilities)
//                        .build();
//                Account account = Account.create(params);
//                user.setStripeAccountId(account.getId());
//            } catch (StripeException e) {
//                throw new RuntimeException("Failed to create Stripe account: " + e.getMessage());
//            }

            userRepository.save(user);
            sendMailRegistrazione(userDto.getEmail());
            // Log l'ID dell'account Stripe
            System.out.println("User created with Stripe account ID: " + user.getStripeAccountId());

            return user.getIdUtente();
        } else {
            throw new BadRequestException("Email già esistente");
        }
    }

    public Page<User> getAllUsers(int page, int size , String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return userRepository.findAll(pageable);
    }

    public Optional<User> getUserById(int id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            List<Stock> stocks = stockRepository.findByUser_IdUtente(user.getIdUtente());
            user.setStocks(stocks); // Assicurati che il setter esista in User
            return Optional.of(user);
        } else {
            return Optional.empty();
        }
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

//    private void sendMailRegistrazione(String email) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(email);
//        message.setSubject("Registrazione Utente");
//        message.setText("Registrazione Utente avvenuta con successo");
//
//        javaMailSender.send(message);
//    }
private void sendMailRegistrazione(String email) {
    try {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        helper.setTo(email);
        helper.setSubject("Registrazione Utente avvenuta con successo");

        String htmlMsg = """
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                        color: #333;
                    }
                    .container {
                        width: 100%;
                        max-width: 600px;
                        margin: 20px auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 10px;
                        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                    }
                    .header {
                        text-align: center;
                        padding-bottom: 20px;
                        border-bottom: 1px solid #e0e0e0;
                    }
                    .header img {
                        width: 200px;
                        height: auto;
                    }
                    .content {
                        padding: 20px;
                        line-height: 1.6;
                    }
                    .content p {
                        margin: 0 0 15px;
                    }
                    .footer {
                        text-align: center;
                        padding-top: 20px;
                        border-top: 1px solid #e0e0e0;
                        font-size: 12px;
                        color: #888;
                    }
                    .button {
                        display: inline-block;
                        padding: 12px 25px;
                        font-size: 16px;
                        color: #ffffff;
                        background-color: #007bff;
                        text-decoration: none;
                        border-radius: 5px;
                        margin-top: 20px;
                    }
                    .social-icons {
                        text-align: center;
                        margin-top: 20px;
                    }
                    .social-icons img {
                        width: 30px;
                        height: auto;
                        margin: 0 10px;
                    }
                    .greeting {
                        font-size: 18px;
                        font-weight: bold;
                        margin-bottom: 15px;
                    }
                    .important-info {
                        background-color: #f9f9f9;
                        border-left: 4px solid #007bff;
                        padding: 10px;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <img src='cid:logoImage' alt="Company Logo">
                    </div>
                    <div class="content">
                        <p class="greeting">Gentile Utente,</p>
                        <p>La tua registrazione è avvenuta con successo!</p>
                        <p>Puoi ora accedere al sistema utilizzando le credenziali fornite durante la registrazione.</p>
                        <p>Se hai domande o necessiti di assistenza, non esitare a contattarci all'indirizzo <a href="mailto:brokersphere1@gmail.com>brokersphere1@gmail.com</a>.</p>
                        <div class="important-info">
                            <p><strong>Informazioni Importanti:</strong></p>
                            <p>Assicurati di completare il tuo profilo e di aggiornare la tua password per garantire la sicurezza del tuo account.</p>
                        </div>
                        <p>Grazie per esserti registrato!</p>
                        <p>Distinti saluti,</p>
                        <p>Il Team di Supporto</p>
                        <a href="http://localhost:4200/login" class="button">Accedi</a>
                    </div>
                    <div class="social-icons">
                        <a href="https://facebook.com"><img src="cid:facebookIcon" alt="Facebook"></a>
                        <a href="https://twitter.com"><img src="cid:twitterIcon" alt="Twitter"></a>
                        <a href="https://instagram.com"><img src="cid:instagramIcon" alt="Instagram"></a>
                    </div>
                    <div class="footer">
                        Copyright © 2024 BrokerSphere. Tutti i diritti riservati.<br>
                        <a href="http://localhost:4200/profilo">Disiscriviti</a> | <a href="http://localhost:4200/privacy-policy">Privacy</a>
                    </div>
                </div>
            </body>
            </html>
            """;

        helper.setText(htmlMsg, true);

        // Add the inline image with content ID 'logoImage'
        ClassPathResource imageResource = new ClassPathResource("static/images/logo.png");
        helper.addInline("logoImage", imageResource);

        // Add social media icons
        ClassPathResource facebookIcon = new ClassPathResource("static/images/facebook.png");
        ClassPathResource twitterIcon = new ClassPathResource("static/images/twitter.webp");
        ClassPathResource instagramIcon = new ClassPathResource("static/images/instagram.png");
        helper.addInline("facebookIcon", facebookIcon);
        helper.addInline("twitterIcon", twitterIcon);
        helper.addInline("instagramIcon", instagramIcon);

        javaMailSender.send(mimeMessage);
    } catch (MessagingException e) {
        logger.error("Errore nell'invio dell'email a {}", email, e);
    }
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
    private void inviaEmailRicarica(User user, BigDecimal amount) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(user.getEmail());
            helper.setSubject("Ricarica Conto Avvenuta con Successo");

            String htmlMsg = String.format("""
            <html>
            <body>
                <p>Gentile %s %s,</p>
                <p>La tua ricarica è avvenuta con successo!</p>
                <p>Dettagli della Ricarica:</p>
                <ul>
                    <li>Importo: € %s</li>
                    <li>Data: %s</li>
                </ul>
                <p>Il tuo nuovo saldo è: € %s</p>
                <p>Se hai domande o necessiti di assistenza, non esitare a contattarci all'indirizzo <a href="mailto:brokersphere1@gmail.com">brokersphere1@gmail.com</a>.</p>
                <p>Grazie per aver ricaricato il tuo conto!</p>
                <p>Distinti saluti,</p>
                <p>Il Team di Supporto</p>
                <img src='cid:logoImage' style='width: 200px; height: auto;'>
            </body>
            </html>
            """, user.getNome(), user.getCognome(), amount.toString(), new Date(), user.getBalance().toString());

            helper.setText(htmlMsg, true);

            // Aggiungi l'immagine inline con l'ID del contenuto 'logoImage'
            ClassPathResource imageResource = new ClassPathResource("static/images/logo.png");
            helper.addInline("logoImage", imageResource);

            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            logger.error("Errore nell'invio dell'email a {}", user.getEmail(), e);
        }
    }
    public User ricaricaSaldo(Integer userId, BigDecimal amount) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            BigDecimal currentBalance = user.getBalance() != null ? user.getBalance() : BigDecimal.ZERO;
            BigDecimal newBalance = currentBalance.add(amount);
            user.setBalance(newBalance);
            userRepository.save(user);
            System.out.println("Saldo ricaricato per l'utente " + userId + ": " + newBalance);
            logTransaction(userId, null, 0, amount, "DEPOSITO");
            // Invia notifica via email
            inviaEmailRicarica(user, amount);

            return user;
        } else {
            throw new RuntimeException("Utente non trovato");
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
//            if (user.getStripeAccountId() == null || user.getStripeAccountId().isEmpty()) {
//                throw new RuntimeException("Stripe account ID is missing for user " + user.getIdUtente());
//            }
            BigDecimal newBalance = currentBalance.subtract(amount);
            user.setBalance(newBalance);
            userRepository.save(user);
            logTransaction(userId, null, 0, amount, "PRELIEVO");
            // Implementa la logica per trasferire i fondi all'utente (es. integrazione con un servizio di pagamento)
           // processWithdrawal(user, amount);
            return user;
        } else {
            throw new RuntimeException("User not found");
        }
    }

//    private void processWithdrawal(User user, BigDecimal amount) {
//        // Implementa l'integrazione con il servizio di pagamento per processare il prelievo
//        try {
//            String stripeAccountId = user.getStripeAccountId();
//            if (stripeAccountId == null || stripeAccountId.isEmpty()) {
//                throw new RuntimeException("Stripe account ID is missing for user " + user.getIdUtente());
//            }
//
//            // Log il valore di stripeAccountId
//            System.out.println("Processing withdrawal for user " + user.getIdUtente() + " with Stripe account ID " + stripeAccountId);
//
//
//            Map<String, Object> transferParams = new HashMap<>();
//            transferParams.put("amount", amount.multiply(BigDecimal.valueOf(100)).intValue()); // Converti l'importo in centesimi
//            transferParams.put("currency", "eur");
//            transferParams.put("destination", stripeAccountId); // ID dell'account Stripe del destinatario
//
//            Transfer transfer = Transfer.create(transferParams);
//
//            // Logga l'operazione di prelievo
//            logWithdrawal(user, amount);
//
////            // Notifica all'utente via email
////            SimpleMailMessage message = new SimpleMailMessage();
////            message.setTo(user.getEmail());
////            message.setSubject("Withdrawal Request");
////            message.setText("Your withdrawal request for amount " + amount + " has been processed. Transaction ID: " + transfer.getId());
////            javaMailSender.send(message);
//
//            // Notifica all'utente via email
//            sendMailPrelievo(user, amount, transfer.getId());
//        } catch (StripeException e) {
//            throw new RuntimeException("Stripe transfer failed: " + e.getMessage());
//        }
//    }

    private void sendMailPrelievo(User user, BigDecimal amount, String transactionId) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(user.getEmail());
            helper.setSubject("Richiesta di Prelievo Elaborata");

            String htmlMsg = String.format("""
            <html>
            <body>
                <p>Gentile %s %s,</p>
                <p>La tua richiesta di prelievo è stata elaborata con successo.</p>
                <p>Dettagli del Prelievo:</p>
                <ul>
                    <li>Importo: € %s</li>
                    <li>ID Transazione: %s</li>
                    <li>Data: %s</li>
                </ul>
                <p>I fondi sono stati trasferiti al tuo account Stripe associato.</p>
                <p>Se hai domande o necessiti di assistenza, non esitare a contattarci all'indirizzo <a href="brokersphere1@gmail.com">brokersphere1@gmail.com</a>.</p>
                <p>Grazie per aver utilizzato i nostri servizi.</p>
                <p>Distinti saluti,</p>
                <p>Il Team di Supporto</p>
                <img src='cid:logoImage' style='width: 200px; height: auto;'>
            </body>
            </html>
            """, user.getNome(), user.getCognome(), amount.toString(), transactionId, new Date());

            helper.setText(htmlMsg, true);

            // Add the inline image with content ID 'logoImage'
            ClassPathResource imageResource = new ClassPathResource("static/images/logo.png");
            helper.addInline("logoImage", imageResource);

            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            logger.error("Errore nell'invio dell'email a {}", user.getEmail(), e);
        }
    }

    private void logWithdrawal(User user, BigDecimal amount) {
        // Logga l'operazione di prelievo per scopi di auditing
        System.out.println("User " + user.getIdUtente() + " requested withdrawal of amount " + amount);
    }

    public List<Stock> getUserStocks(Integer userId) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getStocks();
        } else {
            throw new NotFoundException("User with id " + userId + " not found");
        }
    }
    private void logTransaction(Integer userId, String symbol, int quantity, BigDecimal price, String type) {
        Transaction transaction = new Transaction();
        transaction.setUserId(userId);
        transaction.setSymbol(symbol);
        transaction.setQuantity(quantity);
        transaction.setPrice(price);
        transaction.setType(type);// "ACQUISTO", "VENDITA", "DEPOSITO", "PRELIEVO"
        transaction.setDate(LocalDateTime.now());
        transactionRepository.save(transaction);
        System.out.println("Logged transaction: " + transaction);
    }

}
