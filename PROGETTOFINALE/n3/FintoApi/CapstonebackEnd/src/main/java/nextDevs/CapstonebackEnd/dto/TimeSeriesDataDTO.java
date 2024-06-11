package nextDevs.CapstonebackEnd.dto;

import lombok.Data;

import java.util.List;

@Data
public class TimeSeriesDataDTO {
    private Long id;
    private String symbol;
    private String interval;
    private String currency;
    private String exchange_timezone;
    private String exchange;
    private String mic_code;
    private String type;


    private List<TimeSeriesValueDTO> timeSeriesValues;

}
