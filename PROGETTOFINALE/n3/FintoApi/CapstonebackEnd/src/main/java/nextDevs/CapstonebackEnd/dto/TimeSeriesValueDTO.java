package nextDevs.CapstonebackEnd.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Data;
import nextDevs.CapstonebackEnd.CustomLocalDateTimeDeserializer;

import java.time.LocalDateTime;
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class TimeSeriesValueDTO {
    private Long id;

    @JsonDeserialize(using = CustomLocalDateTimeDeserializer.class)
    private LocalDateTime datetime;
    private double open;
    private double high;
    private double low;
    private double close;
    private double volume;

    private TimeSeriesDataDTO timeSeriesData;

}
