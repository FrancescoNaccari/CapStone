package nextDevs.CapstonebackEnd.service;

import nextDevs.CapstonebackEnd.dto.NewsletterRequestDto;
import nextDevs.CapstonebackEnd.model.NewsletterSubscription;
import nextDevs.CapstonebackEnd.model.User;
import nextDevs.CapstonebackEnd.repository.NewsletterSubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsletterService {
    @Autowired
    private NewsletterSubscriptionRepository repository;
@Autowired
private UserService userService;

    @Autowired
    private JavaMailSender mailSender;

    public Integer nuovaNewsletter(NewsletterRequestDto newsletterRequestDto){
        NewsletterSubscription newsletterSubscription = new NewsletterSubscription();
        newsletterSubscription.setTitolo(newsletterRequestDto.getTitolo());
        newsletterSubscription.setTesto(newsletterRequestDto.getTesto());
        repository.save(newsletterSubscription);
        List<User> users = userService.getAllUsers(0,1000,"idUtente").getContent();

        users.stream().filter(user -> user.isNewsletter()).toList().forEach(user -> sendSimpleMessage(user.getEmail(),
                newsletterRequestDto.getTitolo(),newsletterRequestDto.getTesto()));
        return newsletterSubscription.getId();
    }

    private void sendSimpleMessage(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(text);
        mailSender.send(message);
    }



}