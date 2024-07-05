package nextDevs.CapstonebackEnd.service;

import jakarta.mail.Address;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Multipart;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import nextDevs.CapstonebackEnd.dto.NewsletterRequestDto;
import nextDevs.CapstonebackEnd.model.NewsletterSubscription;
import nextDevs.CapstonebackEnd.model.User;
import nextDevs.CapstonebackEnd.repository.NewsletterSubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NewsletterService {
    @Autowired
    private NewsletterSubscriptionRepository repository;

    @Autowired
    private UserService userService;

    @Autowired
    private JavaMailSender mailSender;

    public Integer nuovaNewsletter(NewsletterRequestDto newsletterRequestDto) {
        NewsletterSubscription newsletterSubscription = new NewsletterSubscription();
        newsletterSubscription.setTitolo(newsletterRequestDto.getTitolo());
        newsletterSubscription.setTesto(newsletterRequestDto.getTesto());
        repository.save(newsletterSubscription);
        List<User> users = userService.getAllUsers(0, 1000, "idUtente").getContent();

        users.stream().filter(User::isNewsletter).forEach(user -> {
            try {
                sendHtmlMessage(user.getEmail(), newsletterRequestDto.getTitolo(), newsletterRequestDto.getTesto());
            } catch (MessagingException e) {
                e.printStackTrace(); // Log the exception
            }
        });
        return newsletterSubscription.getId();
    }

    private void sendHtmlMessage(String to, String subject, String htmlBody) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
//        helper.setTo(to);
//        helper.setSubject(subject);
//        helper.setText(htmlBody, true);
//        message.saveChanges();
//        mailSender.send(message);

        // Create a Multipart email
        Multipart multipart = new MimeMultipart();

        message.setRecipients(Message.RecipientType.TO, to);
        message.setSubject(subject);

        // Add the HTML part
        MimeBodyPart htmlPart = new MimeBodyPart();
        htmlPart.setContent(htmlBody, "text/html; charset=UTF-8");
        multipart.addBodyPart(htmlPart);

        // Set the Multipart email
        message.setContent(multipart);

        mailSender.send(message);
    }



//    public Integer nuovaNewsletter(String titolo, String testo, List<MultipartFile> files) {
//        NewsletterSubscription newsletterSubscription = new NewsletterSubscription();
//        newsletterSubscription.setTitolo(titolo);
//        newsletterSubscription.setTesto(testo);
//        repository.save(newsletterSubscription);
//        List<User> users = userService.getAllUsers(0, 1000, "idUtente").getContent();
//
//        StringBuilder htmlBodyBuilder = new StringBuilder("<html><body>")
//                .append("<h1>").append(titolo).append("</h1>")
//                .append("<p>").append(testo).append("</p>");
//
//        // Salva i file temporaneamente
//        List<Path> tempFiles = new ArrayList<>();
//        for (MultipartFile file : files) {
//            try {
//                Path tempDir = Files.createTempDirectory("uploads");
//                Path tempFile = tempDir.resolve(file.getOriginalFilename());
//                file.transferTo(tempFile);
//                tempFiles.add(tempFile);
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
//
//        // Aggiungi le immagini al corpo dell'email
//        for (int i = 0; i < tempFiles.size(); i++) {
//            htmlBodyBuilder.append("<img src='cid:image").append(i).append("' />");
//        }
//        htmlBodyBuilder.append("</body></html>");
//        String htmlBody = htmlBodyBuilder.toString();
//
//        users.stream().filter(User::isNewsletter).forEach(user -> {
//            try {
//                sendHtmlMessage(user.getEmail(), titolo, htmlBody, tempFiles);
//            } catch (MessagingException e) {
//                e.printStackTrace(); // Log the exception
//            }
//        });
//
//        // Elimina i file temporanei
//        for (Path tempFile : tempFiles) {
//            try {
//                Files.delete(tempFile);
//                Files.delete(tempFile.getParent());
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }
//
//        return newsletterSubscription.getId();
//    }
//
//    private void sendHtmlMessage(String to, String subject, String htmlBody, List<Path> imagePaths) throws MessagingException {
//        MimeMessage message = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
//
//        helper.setTo(to);
//        helper.setSubject(subject);
//        helper.setText(htmlBody, true);
//
//        // Aggiungi le immagini come allegati e imposta il Content-ID (CID)
//        for (int i = 0; i < imagePaths.size(); i++) {
//            FileSystemResource res = new FileSystemResource(new File(imagePaths.get(i).toString()));
//            helper.addInline("image" + i, res);
//        }
//
//        mailSender.send(message);
//    }
}