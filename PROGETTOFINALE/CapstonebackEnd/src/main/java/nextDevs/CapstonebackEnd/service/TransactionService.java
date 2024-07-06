package nextDevs.CapstonebackEnd.service;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
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
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private JavaMailSenderImpl javaMailSender;
    private static final Logger logger = LoggerFactory.getLogger(TransactionService.class);
    public User buyStock(Integer userId, String symbol, int quantity, BigDecimal price) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));

        BigDecimal cost = price.multiply(BigDecimal.valueOf(quantity));
        if (user.getBalance().compareTo(cost) < 0) {
            throw new Exception("Insufficient balance");
        }

        user.setBalance(user.getBalance().subtract(cost));

        Optional<Stock> optionalStock = stockRepository.findByUserAndSymbol(user, symbol);
        Stock stock;
        if (optionalStock.isPresent()) {
            stock = optionalStock.get();
            stock.setQuantity(stock.getQuantity() + quantity);
        } else {
            stock = new Stock();
            stock.setSymbol(symbol);
            stock.setQuantity(quantity);
            stock.setUser(user);
        }

        stockRepository.save(stock);
        userRepository.save(user);
        // Log the transaction
        logTransaction(userId, symbol, quantity, price, "ACQUISTO");
        // Invia email di riepilogo acquisto
        inviaEmailAcquisto(user, symbol, quantity, price);

        return user;
    }

    public User sellStock(Integer userId, String symbol, int quantity, BigDecimal price) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));

        Stock stock = stockRepository.findByUserAndSymbol(user, symbol)
                .orElseThrow(() -> new Exception("Stock not found"));

        if (stock.getQuantity() < quantity) {
            throw new Exception("Insufficient stock quantity");
        }

        BigDecimal gain = price.multiply(BigDecimal.valueOf(quantity));
        user.setBalance(user.getBalance().add(gain));

        stock.setQuantity(stock.getQuantity() - quantity);
        if (stock.getQuantity() == 0) {
            stockRepository.delete(stock);
        } else {
            stockRepository.save(stock);
        }

        userRepository.save(user);
        // Log the transaction
        logTransaction(userId, symbol, quantity, price, "VENDITA");
        // Invia email di riepilogo vendita
        inviaEmailVendita(user, symbol, quantity, price);
        return user;
    }

    private void logTransaction(Integer userId, String symbol, int quantity, BigDecimal price, String type) {
        Transaction transaction = new Transaction();
        transaction.setUserId(userId);
        transaction.setSymbol(symbol);
        transaction.setQuantity(quantity);
        transaction.setPrice(price);
        transaction.setType(type);
        transaction.setDate(LocalDateTime.now());
        transactionRepository.save(transaction);
        System.out.println("Logged transaction: " + transaction);
    }

    public List<Transaction> getUserTransactions(Integer userId) {
        return transactionRepository.findByUserId(userId);
    }
    private void inviaEmailAcquisto(User user, String symbol, int quantity, BigDecimal price) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(user.getEmail());
            helper.setSubject("Acquisto Azioni Avvenuto con Successo");

            String htmlMsg = String.format("""
            <html>
            <body>
                <p>Gentile %s %s,</p>
                <p>Il tuo acquisto di azioni è avvenuto con successo!</p>
                <p>Dettagli dell'Acquisto:</p>
                <ul>
                    <li>Simbolo: %s</li>
                    <li>Quantità: %d</li>
                    <li>Prezzo per Azione: € %s</li>
                    <li>Totale: € %s</li>
                    <li>Data: %s</li>
                </ul>
                <p>Se hai domande o necessiti di assistenza, non esitare a contattarci all'indirizzo <a href="mailto:brokersphere1@gmail.com">brokersphere1@gmail.com</a>.</p>
                <p>Grazie per aver acquistato azioni!</p>
                <p>Distinti saluti,</p>
                <p>Il Team di Supporto</p>
                <img src='cid:logoImage' style='width: 200px; height: auto;'>
            </body>
            </html>
//            """, user.getNome(), user.getCognome(), symbol, quantity, price.toString(), price.multiply(BigDecimal.valueOf(quantity)).toString(), new Date());

            helper.setText(htmlMsg, true);

            // Aggiungi l'immagine inline con l'ID del contenuto 'logoImage'
            ClassPathResource imageResource = new ClassPathResource("static/images/logo.png");
            helper.addInline("logoImage", imageResource);

            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            logger.error("Errore nell'invio dell'email a {}", user.getEmail(), e);
        }
    }
    private void inviaEmailVendita(User user, String symbol, int quantity, BigDecimal price) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(user.getEmail());
            helper.setSubject("Vendita Azioni Avvenuta con Successo");

            String htmlMsg = String.format("""
            <html>
            <body>
                <p>Gentile %s %s,</p>
                <p>La tua vendita di azioni è avvenuta con successo!</p>
                <p>Dettagli della Vendita:</p>
                <ul>
                    <li>Simbolo: %s</li>
                    <li>Quantità: %d</li>
                    <li>Prezzo per Azione: € %s</li>
                    <li>Totale: € %s</li>
                    <li>Data: %s</li>
                </ul>
                <p>Se hai domande o necessiti di assistenza, non esitare a contattarci all'indirizzo <a href="mailto:brokersphere1@gmail.com">brokersphere1@gmail.com</a>.</p>
                <p>Grazie per aver venduto azioni!</p>
                <p>Distinti saluti,</p>
                <p>Il Team di Supporto</p>
                <img src='cid:logoImage' style='width: 200px; height: auto;'>
            </body>
            </html>
            """, user.getNome(), user.getCognome(), symbol, quantity, price.toString(), price.multiply(BigDecimal.valueOf(quantity)).toString(), new Date());

            helper.setText(htmlMsg, true);

            // Aggiungi l'immagine inline con l'ID del contenuto 'logoImage'
            ClassPathResource imageResource = new ClassPathResource("static/images/logo.png");
            helper.addInline("logoImage", imageResource);

            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            logger.error("Errore nell'invio dell'email a {}", user.getEmail(), e);
        }
    }


}