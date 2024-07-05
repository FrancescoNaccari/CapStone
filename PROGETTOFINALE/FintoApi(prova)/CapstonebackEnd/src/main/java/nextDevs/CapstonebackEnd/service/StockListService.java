package nextDevs.CapstonebackEnd.service;

import nextDevs.CapstonebackEnd.dto.LogoBorsaDTO;
import nextDevs.CapstonebackEnd.dto.StockListDTO;
import nextDevs.CapstonebackEnd.dto.TimeSeriesDataDTO;
import nextDevs.CapstonebackEnd.dto.TimeSeriesValueDTO;
import nextDevs.CapstonebackEnd.model.LogoBorsa;
import nextDevs.CapstonebackEnd.model.StockList;
import nextDevs.CapstonebackEnd.model.TimeSeriesData;
import nextDevs.CapstonebackEnd.model.TimeSeriesValue;
import nextDevs.CapstonebackEnd.repository.StockListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service

public class StockListService {

    @Autowired
    private StockListRepository stockListRepository;

    public List<StockListDTO> findAll() {
        return stockListRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public StockListDTO findById(String symbol) {
        return stockListRepository.findById(symbol)
                .map(this::toDTO)
                .orElse(null);
    }

    public StockListDTO save(StockListDTO stockListDTO) {
        StockList stockList = toEntity(stockListDTO);
        return toDTO(stockListRepository.save(stockList));
    }

    public void deleteById(String symbol) {
        stockListRepository.deleteById(symbol);
    }

    private StockListDTO toDTO(StockList stockList) {
        StockListDTO dto = new StockListDTO();
        dto.setSymbol(stockList.getSymbol());
        dto.setName(stockList.getName());
        dto.setCurrency(stockList.getCurrency());
        dto.setExchange(stockList.getExchange());
        dto.setMic_code(stockList.getMic_code());
        dto.setCountry(stockList.getCountry());
        dto.setType(stockList.getType());

        if (stockList.getTimeSeriesData() != null) {
            dto.setTimeSeriesData(stockList.getTimeSeriesData().stream()
                    .map(this::toDTO)
                    .collect(Collectors.toList()));
        }
        return dto;
    }

    private StockList toEntity(StockListDTO dto) {
        StockList stockList = new StockList();
        stockList.setSymbol(dto.getSymbol());
        stockList.setName(dto.getName());
        stockList.setCurrency(dto.getCurrency());
        stockList.setExchange(dto.getExchange());
        stockList.setMic_code(dto.getMic_code());
        stockList.setCountry(dto.getCountry());
        stockList.setType(dto.getType());

        if (dto.getTimeSeriesData() != null) {
            stockList.setTimeSeriesData(dto.getTimeSeriesData().stream()
                    .map(this::toEntity)
                    .collect(Collectors.toList()));
        }
        return stockList;
    }

    private LogoBorsaDTO toDTO(LogoBorsa logoBorsa) {
        LogoBorsaDTO dto = new LogoBorsaDTO();
        dto.setId(logoBorsa.getId());
        dto.setUrl(logoBorsa.getUrl());
        return dto;
    }

    private LogoBorsa toEntity(LogoBorsaDTO dto) {
        LogoBorsa logoBorsa = new LogoBorsa();
        logoBorsa.setId(dto.getId());
        logoBorsa.setUrl(dto.getUrl());
        return logoBorsa;
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
            timeSeriesData.setTimeSeriesValues(dto.getTimeSeriesValues().stream()
                    .map(this::toEntity)
                    .collect(Collectors.toList()));
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
