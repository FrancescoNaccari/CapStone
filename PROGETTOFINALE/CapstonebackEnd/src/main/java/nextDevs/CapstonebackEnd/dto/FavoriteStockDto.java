package nextDevs.CapstonebackEnd.dto;

import lombok.Data;

@Data
public class FavoriteStockDto {
    private Integer userId;
    private String symbol;
    private String name;
    private Double price;
    private Boolean increased;
    private String logoUrl;
}
