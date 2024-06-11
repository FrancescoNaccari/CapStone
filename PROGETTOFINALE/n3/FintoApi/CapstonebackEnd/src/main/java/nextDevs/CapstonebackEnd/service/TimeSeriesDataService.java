package nextDevs.CapstonebackEnd.service;

import nextDevs.CapstonebackEnd.dto.TimeSeriesDataDTO;
import nextDevs.CapstonebackEnd.dto.TimeSeriesValueDTO;
import nextDevs.CapstonebackEnd.model.StockList;
import nextDevs.CapstonebackEnd.model.TimeSeriesData;
import nextDevs.CapstonebackEnd.model.TimeSeriesValue;
import nextDevs.CapstonebackEnd.repository.StockListRepository;
import nextDevs.CapstonebackEnd.repository.TimeSeriesDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TimeSeriesDataService {
    @Autowired
    private TimeSeriesDataRepository timeSeriesDataRepository;

    @Autowired
    private StockListRepository stockListRepository;  // Aggiungi questo

    public List<TimeSeriesDataDTO> findAll() {
        return timeSeriesDataRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public TimeSeriesDataDTO findById(Long id) {
        return timeSeriesDataRepository.findById(id)
                .map(this::toDTO)
                .orElse(null);
    }

//    public TimeSeriesDataDTO save(TimeSeriesDataDTO timeSeriesDataDTO) {
//        TimeSeriesData timeSeriesData = toEntity(timeSeriesDataDTO);
//
//        // Imposta la relazione per StockList
//        if (timeSeriesDataDTO.getSymbol() != null) {
//            StockList stockList = stockListRepository.findById(timeSeriesDataDTO.getSymbol()).orElse(null);
//            if (stockList != null) {
//                timeSeriesData.setStockList(stockList);
//            }
//        }
//
//        // Imposta la relazione per TimeSeriesValues
//        if (timeSeriesDataDTO.getTimeSeriesValues() != null) {
//            List<TimeSeriesValue> timeSeriesValues = timeSeriesDataDTO.getTimeSeriesValues().stream()
//                    .map(this::toEntity)
//                    .collect(Collectors.toList());
//            for (TimeSeriesValue value : timeSeriesValues) {
//                value.setTimeSeriesData(timeSeriesData);
//            }
//            timeSeriesData.setTimeSeriesValues(timeSeriesValues);
//        }
//
//        return toDTO(timeSeriesDataRepository.save(timeSeriesData));
//    }

    public void deleteById(Long id) {
        timeSeriesDataRepository.deleteById(id);
    }

//    public List<TimeSeriesData> findBySomeField(String someField) {
//        return timeSeriesDataRepository.findBySomeField(someField);
//    }
public TimeSeriesDataDTO save(TimeSeriesDataDTO timeSeriesDataDTO) {
    TimeSeriesData existingTimeSeriesData = timeSeriesDataRepository
            .findBySymbolAndInterval(timeSeriesDataDTO.getSymbol(), timeSeriesDataDTO.getInterval())
            .orElse(null);

    if (existingTimeSeriesData != null) {
        // Aggiorna l'entità esistente
        existingTimeSeriesData.setCurrency(timeSeriesDataDTO.getCurrency());
        existingTimeSeriesData.setExchange(timeSeriesDataDTO.getExchange());
        existingTimeSeriesData.setExchange_timezone(timeSeriesDataDTO.getExchange_timezone());
        existingTimeSeriesData.setMic_code(timeSeriesDataDTO.getMic_code());
        existingTimeSeriesData.setType(timeSeriesDataDTO.getType());

        // Aggiorna i TimeSeriesValues
        if (timeSeriesDataDTO.getTimeSeriesValues() != null) {
            List<TimeSeriesValue> timeSeriesValues = timeSeriesDataDTO.getTimeSeriesValues().stream()
                    .map(this::toEntity)
                    .collect(Collectors.toList());
            for (TimeSeriesValue value : timeSeriesValues) {
                value.setTimeSeriesData(existingTimeSeriesData);
            }
            existingTimeSeriesData.setTimeSeriesValues(timeSeriesValues);
        }

        return toDTO(timeSeriesDataRepository.save(existingTimeSeriesData));
    } else {
        // Crea una nuova entità
        TimeSeriesData timeSeriesData = toEntity(timeSeriesDataDTO);

        if (timeSeriesDataDTO.getSymbol() != null) {
            StockList stockList = stockListRepository.findById(timeSeriesDataDTO.getSymbol()).orElse(null);
            if (stockList != null) {
                timeSeriesData.setStockList(stockList);
            }
        }

        if (timeSeriesDataDTO.getTimeSeriesValues() != null) {
            List<TimeSeriesValue> timeSeriesValues = timeSeriesDataDTO.getTimeSeriesValues().stream()
                    .map(this::toEntity)
                    .collect(Collectors.toList());
            for (TimeSeriesValue value : timeSeriesValues) {
                value.setTimeSeriesData(timeSeriesData);
            }
            timeSeriesData.setTimeSeriesValues(timeSeriesValues);
        }

        return toDTO(timeSeriesDataRepository.save(timeSeriesData));
    }
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
        if (timeSeriesData.getTimeSeriesValues() != null) {
            dto.setTimeSeriesValues(timeSeriesData.getTimeSeriesValues().stream()
                    .map(this::toDTO)
                    .collect(Collectors.toList()));
        }
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
        if (dto.getTimeSeriesValues() != null) {
            List<TimeSeriesValue> timeSeriesValues = dto.getTimeSeriesValues().stream()
                    .map(this::toEntity)
                    .collect(Collectors.toList());
            timeSeriesData.setTimeSeriesValues(timeSeriesValues);
        }
        return timeSeriesData;
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
        return timeSeriesValue;
    }
}
