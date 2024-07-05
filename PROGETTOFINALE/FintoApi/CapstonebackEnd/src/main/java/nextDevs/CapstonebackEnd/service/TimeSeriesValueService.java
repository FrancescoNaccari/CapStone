package nextDevs.CapstonebackEnd.service;

import nextDevs.CapstonebackEnd.dto.TimeSeriesDataDTO;
import nextDevs.CapstonebackEnd.dto.TimeSeriesValueDTO;
import nextDevs.CapstonebackEnd.model.TimeSeriesData;
import nextDevs.CapstonebackEnd.model.TimeSeriesValue;
import nextDevs.CapstonebackEnd.repository.TimeSeriesValueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TimeSeriesValueService {
    @Autowired
    private TimeSeriesValueRepository timeSeriesValueRepository;

    public List<TimeSeriesValueDTO> findAll() {
        return timeSeriesValueRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public TimeSeriesValueDTO findById(Long id) {
        return timeSeriesValueRepository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

    public TimeSeriesValueDTO save(TimeSeriesValueDTO timeSeriesValueDTO) {
        TimeSeriesValue timeSeriesValue = toEntity(timeSeriesValueDTO);

        // Assicura che TimeSeriesData sia impostato
        if (timeSeriesValueDTO.getTimeSeriesData() != null) {
            TimeSeriesData timeSeriesData = new TimeSeriesData();
            timeSeriesData.setId(timeSeriesValueDTO.getTimeSeriesData().getId());
            timeSeriesValue.setTimeSeriesData(timeSeriesData);
        }

        return toDTO(timeSeriesValueRepository.save(timeSeriesValue));
    }

    public void deleteById(Long id) {
        timeSeriesValueRepository.deleteById(id);
    }

    private TimeSeriesValueDTO toDTO(TimeSeriesValue timeSeriesValue) {
        TimeSeriesValueDTO dto = new TimeSeriesValueDTO();
        dto.setId(timeSeriesValue.getId());
        dto.setDatetime(timeSeriesValue.getDatetime());
        dto.setOpen(timeSeriesValue.getOpen());
        dto.setHigh(timeSeriesValue.getHigh());
        dto.setLow(timeSeriesValue.getLow());
        dto.setClose(timeSeriesValue.getClose());
        dto.setVolume(timeSeriesValue.getVolume());
        // Imposta TimeSeriesDataDTO se disponibile
        if (timeSeriesValue.getTimeSeriesData() != null) {
            dto.setTimeSeriesData(toDTO(timeSeriesValue.getTimeSeriesData()));
        }
        return dto;
    }

    private TimeSeriesValue toEntity(TimeSeriesValueDTO dto) {
        TimeSeriesValue timeSeriesValue = new TimeSeriesValue();
        timeSeriesValue.setId(dto.getId());
        timeSeriesValue.setDatetime(dto.getDatetime());
        timeSeriesValue.setOpen(dto.getOpen());
        timeSeriesValue.setHigh(dto.getHigh());
        timeSeriesValue.setLow(dto.getLow());
        timeSeriesValue.setClose(dto.getClose());
        timeSeriesValue.setVolume(dto.getVolume());
        // Imposta TimeSeriesData se disponibile
        if (dto.getTimeSeriesData() != null) {
            TimeSeriesData timeSeriesData = new TimeSeriesData();
            timeSeriesData.setId(dto.getTimeSeriesData().getId());
            timeSeriesValue.setTimeSeriesData(timeSeriesData);
        }
        return timeSeriesValue;
    }

    private TimeSeriesDataDTO toDTO(TimeSeriesData timeSeriesData) {
        TimeSeriesDataDTO dto = new TimeSeriesDataDTO();
        dto.setId(timeSeriesData.getId());
        dto.setSymbol(timeSeriesData.getSymbol());
        dto.setInterval(timeSeriesData.getInterval());
        dto.setCurrency(timeSeriesData.getCurrency());
        dto.setExchange_timezone(timeSeriesData.getExchange_timezone());
        dto.setExchange(timeSeriesData.getExchange());
        dto.setMic_code(timeSeriesData.getMic_code());
        dto.setType(timeSeriesData.getType());
        return dto;
    }

    private TimeSeriesData toEntity(TimeSeriesDataDTO dto) {
        TimeSeriesData timeSeriesData = new TimeSeriesData();
        timeSeriesData.setId(dto.getId());
        timeSeriesData.setSymbol(dto.getSymbol());
        timeSeriesData.setInterval(dto.getInterval());
        timeSeriesData.setCurrency(dto.getCurrency());
        timeSeriesData.setExchange_timezone(dto.getExchange_timezone());
        timeSeriesData.setExchange(dto.getExchange());
        timeSeriesData.setMic_code(dto.getMic_code());
        timeSeriesData.setType(dto.getType());
        return timeSeriesData;
    }
}
