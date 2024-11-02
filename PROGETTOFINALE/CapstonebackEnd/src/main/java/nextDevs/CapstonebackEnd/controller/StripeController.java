package nextDevs.CapstonebackEnd.controller;


import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.exception.StripeException;
import com.stripe.param.checkout.SessionCreateParams;
import jakarta.annotation.PostConstruct;
import nextDevs.CapstonebackEnd.model.CheckoutPayment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping(value = "/api")
public class StripeController {

    @Value("${stripe.secret.key}")
    private String stripeSecretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }

    @PostMapping("/payment")
    public String paymentWithCheckoutPage(@RequestBody CheckoutPayment payment) throws StripeException {
        // Assicurati che l'API Stripe sia correttamente inizializzata
        System.out.println("Iniziando il pagamento per: " + payment.getClientReferenceId());

        SessionCreateParams params = SessionCreateParams.builder()
                .setClientReferenceId(payment.getClientReferenceId())
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(payment.getSuccessUrl())
                .setCancelUrl(payment.getCancelUrl())
                .addLineItem(
                        SessionCreateParams.LineItem.builder()
                                .setQuantity(payment.getQuantity())
                                .setPriceData(
                                        SessionCreateParams.LineItem.PriceData.builder()
                                                .setCurrency(payment.getCurrency())
                                                .setUnitAmount(payment.getAmount())
                                                .setProductData(
                                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName(payment.getName())
                                                                .build())
                                                .build())
                                .build())
                .build();

        Session session = Session.create(params);
        Map<String, String> responseData = new HashMap<>();
        responseData.put("id", session.getId());
        return new Gson().toJson(responseData);
    }


}


