package nextDevs.CapstonebackEnd.controller;


import nextDevs.CapstonebackEnd.dto.NewsletterRequestDto;
import nextDevs.CapstonebackEnd.service.NewsletterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/newsletter")
public class NewsletterController {
    @Autowired
    private NewsletterService newsletterService;



    @PostMapping("/send")
    public ResponseEntity<Integer> sendNewsletter(@RequestBody NewsletterRequestDto newsletterRequestDto) {
        // Chiamata al servizio per inviare la newsletter
        newsletterService.nuovaNewsletter(newsletterRequestDto);
        return ResponseEntity.ok().build();
    }

//    @PostMapping("/send")
//    public ResponseEntity<Integer> sendNewsletter(
//            @RequestParam("titolo") String titolo,
//            @RequestParam("testo") String testo,
//            @RequestParam("file") List<MultipartFile> files) {
//        return ResponseEntity.ok(newsletterService.nuovaNewsletter(titolo, testo, files));
//    }
    }

