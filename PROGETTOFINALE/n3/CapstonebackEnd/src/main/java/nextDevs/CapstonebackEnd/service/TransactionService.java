package nextDevs.CapstonebackEnd.service;


import nextDevs.CapstonebackEnd.model.Stock;


import nextDevs.CapstonebackEnd.model.Transaction;
import nextDevs.CapstonebackEnd.model.User;
import nextDevs.CapstonebackEnd.repository.StockRepository;

import nextDevs.CapstonebackEnd.repository.TransactionRepository;
import nextDevs.CapstonebackEnd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
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
        logTransaction(userId, symbol, quantity, price, "BUY");
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
        logTransaction(userId, symbol, quantity, price, "SELL");
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
}