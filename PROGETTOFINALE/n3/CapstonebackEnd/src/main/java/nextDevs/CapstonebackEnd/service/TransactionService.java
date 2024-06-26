package nextDevs.CapstonebackEnd.service;

import nextDevs.CapstonebackEnd.model.Stock;
import nextDevs.CapstonebackEnd.model.User;
import nextDevs.CapstonebackEnd.repository.StockRepository;
import nextDevs.CapstonebackEnd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private UserRepository userRepository;

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

        return user;
    }
}