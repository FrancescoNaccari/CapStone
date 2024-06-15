package nextDevs.CapstonebackEnd.service;

import nextDevs.CapstonebackEnd.dto.FavoriteStockDto;
import nextDevs.CapstonebackEnd.model.FavoriteStock;
import nextDevs.CapstonebackEnd.repository.FavoriteStockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteStockService {

    @Autowired
    private FavoriteStockRepository favoriteStockRepository;

    public FavoriteStock addFavorite(FavoriteStock favoriteStock) {
        return favoriteStockRepository.save(favoriteStock);
    }

    public List<FavoriteStock> getFavoritesByUserId(String userId) {
        return favoriteStockRepository.findByUserId(userId);
    }

    public void removeFavorite(Integer favoriteId) {
        favoriteStockRepository.deleteById(favoriteId);
    }
}