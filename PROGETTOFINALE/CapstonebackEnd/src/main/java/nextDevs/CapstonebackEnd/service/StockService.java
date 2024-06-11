package nextDevs.CapstonebackEnd.service;

import nextDevs.CapstonebackEnd.model.Stock;
import nextDevs.CapstonebackEnd.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public List<Stock> getStocksBySymbol(String symbol) {
        return stockRepository.findBySymbol(symbol);
    }

    // Additional methods to add, update and delete stocks

}
