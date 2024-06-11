package nextDevs.CapstonebackEnd.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import nextDevs.CapstonebackEnd.dto.*;
import nextDevs.CapstonebackEnd.model.*;
import nextDevs.CapstonebackEnd.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DatabasePopulatorService {

    @Autowired
    private LogoBorsaRepository logoBorsaRepository;

    @Autowired
    private StockListRepository stockListRepository;

    @Autowired
    private TimeSeriesDataRepository timeSeriesDataRepository;

    @Autowired
    private TimeSeriesValueRepository timeSeriesValueRepository;

    @Autowired
    private ObjectMapper objectMapper;

    public void populateLogoBorsa(String json) throws JsonProcessingException {
        LogoBorsaDTO logoBorsaDTO = objectMapper.readValue(json, LogoBorsaDTO.class);
        LogoBorsa logoBorsa = toEntity(logoBorsaDTO);
        logoBorsaRepository.save(logoBorsa);
    }

    public void populateStockList(String json) throws JsonProcessingException {
        StockListDTO stockListDTO = objectMapper.readValue(json, StockListDTO.class);
        StockList stockList = toEntity(stockListDTO);
        stockListRepository.save(stockList);
    }


    public void populateTimeSeriesData(String json) throws JsonProcessingException {
        TimeSeriesDataDTO timeSeriesDataDTO = objectMapper.readValue(json, TimeSeriesDataDTO.class);
        TimeSeriesData timeSeriesData = toEntity(timeSeriesDataDTO);
        timeSeriesDataRepository.save(timeSeriesData);
    }

    public void populateTimeSeriesValue(String json) throws JsonProcessingException {
        TimeSeriesValueDTO timeSeriesValueDTO = objectMapper.readValue(json, TimeSeriesValueDTO.class);
        TimeSeriesValue timeSeriesValue = toEntity(timeSeriesValueDTO);
        timeSeriesValueRepository.save(timeSeriesValue);
    }

    // Mapping methods
    private LogoBorsa toEntity(LogoBorsaDTO dto) {
        LogoBorsa logoBorsa = new LogoBorsa();
        logoBorsa.setId(dto.getId());
        logoBorsa.setUrl(dto.getUrl());
        return logoBorsa;
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