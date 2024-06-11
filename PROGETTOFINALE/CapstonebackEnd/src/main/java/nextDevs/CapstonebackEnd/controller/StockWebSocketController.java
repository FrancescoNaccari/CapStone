package nextDevs.CapstonebackEnd.controller;

import nextDevs.CapstonebackEnd.model.Stock;
import nextDevs.CapstonebackEnd.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class StockWebSocketController {

    @Autowired
    private StockService stockService;

    @Scheduled(fixedRate = 1000)
    @SendTo("/topic/stocks")
    public List<Stock> sendMarketUpdates() {
        return stockService.getAllStocks();
    }
}