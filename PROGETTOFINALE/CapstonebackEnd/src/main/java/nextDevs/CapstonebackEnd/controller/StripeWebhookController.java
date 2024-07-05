package nextDevs.CapstonebackEnd.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.stripe.Stripe;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import nextDevs.CapstonebackEnd.model.User;
import nextDevs.CapstonebackEnd.repository.UserRepository;
import nextDevs.CapstonebackEnd.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.Optional;

@RestController
public class StripeWebhookController {
//    @Value("${stripe.webhook.secret}")
//    private String stripeSecret;

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

    private static final ObjectMapper objectMapper=new ObjectMapper();

    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(@RequestBody String payload, @RequestHeader ("Stripe-Signature")String signature) {

        Event event ;
        try {
            event = Webhook.constructEvent(payload,signature, "whsec_C7dzDBbVNr3Y4m4tCGYWRUQyKoETELcy");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Webhook Error: "+ e.getMessage());
        }

                if ("checkout.session.completed".equals(event.getType())){


            Session session= (Session)event.getDataObjectDeserializer().getObject().orElse(null);

                    if (session != null) {
                        Integer userId = Integer.parseInt(session.getClientReferenceId());
                        System.out.println("Aggiunti " + session.getAmountTotal() + " a " + userId);
                        Optional<User> userOptional = userService.getUserById(userId);
                        if (userOptional.isPresent()) {
                            User user = userOptional.get();
                            BigDecimal amountToAdd = BigDecimal.valueOf(session.getAmountTotal()).divide(BigDecimal.valueOf(100)); // Converti centesimi a unità
                            userService.ricaricaSaldo(userId, amountToAdd);
                        }
                    }
                }
        return ResponseEntity.ok("Success");
    }
}
