package nextDevs.CapstonebackEnd.service;

import nextDevs.CapstonebackEnd.dto.FavoriteStockDto;
import nextDevs.CapstonebackEnd.exception.NotFoundException;
import nextDevs.CapstonebackEnd.model.FavoriteStock;
import nextDevs.CapstonebackEnd.model.User;
import nextDevs.CapstonebackEnd.repository.FavoriteStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavoriteStockService {

    @Autowired
    private FavoriteStockRepository favoriteStockRepository;

    @Autowired
    private UserService userService;

    public FavoriteStock addFavorite(FavoriteStockDto favoriteStockDto) {
        Optional<User> user = userService.getUserById(favoriteStockDto.getUserId());
        if(user.isPresent()){
            FavoriteStock favoriteStock= new FavoriteStock();
            favoriteStock.setUser(user.get());
            favoriteStock.setName(favoriteStockDto.getName());
            favoriteStock.setPrice(favoriteStock.getPrice());
            favoriteStock.setSymbol(favoriteStockDto.getSymbol());
            favoriteStock.setIncreased(favoriteStockDto.getIncreased());
            favoriteStock.setLogoUrl(favoriteStockDto.getLogoUrl());
            return favoriteStockRepository.save(favoriteStock);
        }else {
            throw new NotFoundException("Utente non trovato");
        }
    }

    public List<FavoriteStock> getFavoritesByUserId(Integer userId) {
        return favoriteStockRepository.findByUser_IdUtente(userId);
    }

    public void removeFavorite(Integer favoriteId) {
        favoriteStockRepository.deleteById(favoriteId);
    }
}