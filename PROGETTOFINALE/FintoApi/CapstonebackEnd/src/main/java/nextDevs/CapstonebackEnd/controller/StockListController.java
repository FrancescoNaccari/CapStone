package nextDevs.CapstonebackEnd.controller;

import nextDevs.CapstonebackEnd.dto.StockListDTO;
import nextDevs.CapstonebackEnd.service.StockListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class StockListController {

    @Autowired
    private StockListService stockListService;

    @GetMapping
    public List<StockListDTO> getAllStocks() {
        return stockListService.findAll();
    }

    @GetMapping("/{symbol}")
    public StockListDTO getStockById(@PathVariable String symbol) {
        return stockListService.findById(symbol);
    }

    @PostMapping
    public StockListDTO createStock(@RequestBody StockListDTO stockListDTO) {
        return stockListService.save(stockListDTO);
    }

    @PutMapping("/{symbol}")
    public StockListDTO updateStock(@PathVariable String symbol, @RequestBody StockListDTO stockListDTO) {
        stockListDTO.setSymbol(symbol);
        return stockListService.save(stockListDTO);
    }

    @DeleteMapping("/{symbol}")
    public void deleteStock(@PathVariable String symbol) {
        stockListService.deleteById(symbol);
    }
}