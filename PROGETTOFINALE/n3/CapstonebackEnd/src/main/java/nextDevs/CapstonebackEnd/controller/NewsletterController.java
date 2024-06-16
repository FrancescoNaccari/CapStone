package nextDevs.CapstonebackEnd.controller;


import nextDevs.CapstonebackEnd.dto.NewsletterRequestDto;
import nextDevs.CapstonebackEnd.service.NewsletterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/newsletter")
public class NewsletterController {
    @Autowired
    private NewsletterService newsletterService;



    @PostMapping("/send")
    public ResponseEntity<String> sendNewsletter(@RequestBody NewsletterRequestDto newsletterRequestDto) {
        // Chiamata al servizio per inviare la newsletter
        newsletterService.nuovaNewsletter(newsletterRequestDto);
        return ResponseEntity.ok("Newsletter inviata con successo");
    }

    }

