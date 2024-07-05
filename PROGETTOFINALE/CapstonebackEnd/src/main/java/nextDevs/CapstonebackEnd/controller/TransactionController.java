package nextDevs.CapstonebackEnd.controller;

import nextDevs.CapstonebackEnd.dto.TransactionRequest;
import nextDevs.CapstonebackEnd.dto.UserDataDto;
import nextDevs.CapstonebackEnd.model.Transaction;
import nextDevs.CapstonebackEnd.model.User;
import nextDevs.CapstonebackEnd.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

//    @PostMapping("/buyStock")
//    public ResponseEntity<User> buyStock(@RequestBody TransactionRequest request) {
//        try {
//            User user = transactionService.buyStock(request.getUserId(), request.getSymbol(), request.getQuantity(), request.getPrice());
//            return ResponseEntity.ok(user);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(null);
//        }
//    }
//
//
//
//    @PostMapping("/sellStock")
//    public ResponseEntity<User> sellStock(@RequestBody TransactionRequest request) {
//        try {
//            User user = transactionService.sellStock(request.getUserId(), request.getSymbol(), request.getQuantity(), request.getPrice());
//            return ResponseEntity.ok(user);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(null);
//        }
//    }

    @PostMapping("/buyStock")
    public ResponseEntity<?> buyStock(@RequestBody TransactionRequest request) {
        try {
            User user = transactionService.buyStock(request.getUserId(), request.getSymbol(), request.getQuantity(), request.getPrice());
            UserDataDto userDto = convertToUserDataDto(user);
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/sellStock")
    public ResponseEntity<?> sellStock(@RequestBody TransactionRequest request) {
        try {
            User user = transactionService.sellStock(request.getUserId(), request.getSymbol(), request.getQuantity(), request.getPrice());
            UserDataDto userDto = convertToUserDataDto(user);
            return ResponseEntity.ok(userDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }


    @GetMapping("/transactions/{userId}")
    public List<Transaction> getUserTransactions(@PathVariable Integer userId) {
        return transactionService.getUserTransactions(userId);
    }

    private UserDataDto convertToUserDataDto(User user) {
        UserDataDto userDto = new UserDataDto();
        userDto.setIdUtente(user.getIdUtente());
        userDto.setEmail(user.getEmail());
        userDto.setUsername(user.getUsername());
        userDto.setNome(user.getNome());
        userDto.setCognome(user.getCognome());
        userDto.setTipoUtente(user.getTipoUtente());
        userDto.setAvatar(user.getAvatar());
        userDto.setBalance(user.getBalance());
        userDto.setNewsletter(user.isNewsletter());
        userDto.setStripeAccountId(user.getStripeAccountId());
        return userDto;
    }



}