package nextDevs.CapstonebackEnd.handlers;

import com.fasterxml.jackson.databind.ObjectMapper;
import nextDevs.CapstonebackEnd.model.Stock;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.List;
import java.util.Random;
import java.util.concurrent.CopyOnWriteArrayList;

public class TradeWebSocketHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    Random r = new Random();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        float oldPrice = 0.0f;

        //Publishing new stock prices every one second for 100 times
        //Pubblicazione di nuovi prezzi delle azioni ogni secondo per 100 volte
        for (int i=0; i < 100; i ++){
            //Calculating Random stock price between 12$ to 13$
            //Calcolo del prezzo casuale delle azioni compreso tra 12$ e 13$
            float stockPrice = 12 + r.nextFloat() * (11300 - 10000);
            float roundedPrice = (float) (Math.round(stockPrice * 100.0) / 100.0);

            //Creating a Stock Object
            //Creazione di un oggetto stock
            Stock stock = new Stock("Amazon",
                    "https://www.pngall.com/wp-content/uploads/15/Amazon-Logo-White-Transparent.png",
                    roundedPrice);
            //Finding whether the stock pric increased or decreased
           // Scoprire se il prezzo delle azioni è aumentato o diminuito
            if (roundedPrice > oldPrice){
                stock.setIncreased(true);
            }
            oldPrice = roundedPrice;

            //Sending StockPrice
            TextMessage message = new TextMessage(objectMapper.writeValueAsString(stock));
            session.sendMessage(message);
            Thread.sleep(1000);
        }
        sessions.add(session);
    }
}
