package nextDevs.CapstonebackEnd.controller;


import nextDevs.CapstonebackEnd.dto.FavoriteStockDto;
import nextDevs.CapstonebackEnd.model.FavoriteStock;
import nextDevs.CapstonebackEnd.service.FavoriteStockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorites")
public class FavoriteStockController {
    @Autowired
    private FavoriteStockService favoriteStockService;

    @PostMapping
    public ResponseEntity<FavoriteStock> addFavorite(@RequestBody FavoriteStockDto favoriteStockDto) {
        FavoriteStock savedFavorite = favoriteStockService.addFavorite(favoriteStockDto);
        return ResponseEntity.ok(savedFavorite);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<FavoriteStock>> getFavorites(@PathVariable Integer userId) {
        List<FavoriteStock> favorites = favoriteStockService.getFavoritesByUserId(userId);
        return ResponseEntity.ok(favorites);
    }

    @DeleteMapping("/{favoriteId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable Integer favoriteId) {
        favoriteStockService.removeFavorite(favoriteId);
        return ResponseEntity.noContent().build();
    }
}
