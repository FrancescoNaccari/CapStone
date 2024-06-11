package nextDevs.CapstonebackEnd.controller;

import nextDevs.CapstonebackEnd.model.Stock;
import nextDevs.CapstonebackEnd.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class StockController {
    @Autowired
    private StockService stockService;

    @GetMapping
    public List<Stock> getAllStocks() {
        return stockService.getAllStocks();
    }

    @GetMapping("/{symbol}")
    public List<Stock> getStocksBySymbol(@PathVariable String symbol) {
        return stockService.getStocksBySymbol(symbol);
    }

// Additional endpoints to add, update and delete stocks


}

