package nextDevs.CapstonebackEnd.dto;

import lombok.Data;

import java.util.List;
@Data
public class StockListDTO {
    private String symbol;
    private String name;
    private String currency;
    private String exchange;
    private String mic_code;
    private String country;
    private String type;
    private List<LogoBorsaDTO> logos;
    private List<TimeSeriesDataDTO> timeSeriesData;

}
