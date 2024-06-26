package nextDevs.CapstonebackEnd.controller;

import nextDevs.CapstonebackEnd.dto.TransactionRequest;
import nextDevs.CapstonebackEnd.model.User;
import nextDevs.CapstonebackEnd.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/buyStock")
    public ResponseEntity<User> buyStock(@RequestBody TransactionRequest request) {
        try {
            User user = transactionService.buyStock(request.getUserId(), request.getSymbol(), request.getQuantity(), request.getPrice());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/sellStock")
    public ResponseEntity<User> sellStock(@RequestBody TransactionRequest request) {
        try {
            User user = transactionService.sellStock(request.getUserId(), request.getSymbol(), request.getQuantity(), request.getPrice());
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}