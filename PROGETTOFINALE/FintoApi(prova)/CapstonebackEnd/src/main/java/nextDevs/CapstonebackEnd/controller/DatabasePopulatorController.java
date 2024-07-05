package nextDevs.CapstonebackEnd.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import nextDevs.CapstonebackEnd.model.TimeSeriesData;
import nextDevs.CapstonebackEnd.repository.TimeSeriesDataRepository;
import nextDevs.CapstonebackEnd.service.DatabasePopulatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/populate")
public class DatabasePopulatorController {

    @Autowired
    private DatabasePopulatorService databasePopulatorService;
    @Autowired
    private TimeSeriesDataRepository timeSeriesDataRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping("/logoborsa")
    public void populateLogoBorsa() throws IOException {
        String json = readFileToString("data/logoBorsa.json");
        databasePopulatorService.populateLogoBorsa(json);
    }

    @PostMapping("/stocklist")
    public void populateStockList() throws IOException {
        String json = readFileToString("data/stockList.json");
        databasePopulatorService.populateStockList(json);
    }

    @PostMapping("/timeseriesdata")
    public void populateTimeSeriesData() throws IOException {
        String json = readFileToString("data/timeSeriesData.json");
        databasePopulatorService.populateTimeSeriesData(json);
    }

    @PostMapping("/timeseriesvalue")
    public void populateTimeSeriesValue() throws IOException {
        String json = readFileToString("data/timeSeriesValue.json");
        databasePopulatorService.populateTimeSeriesValue(json);
    }

    private String readFileToString(String path) throws IOException {
        ClassPathResource resource = new ClassPathResource(path);
        byte[] binaryData = FileCopyUtils.copyToByteArray(resource.getInputStream());
        return new String(binaryData, StandardCharsets.UTF_8);
    }



//    @PostMapping("/muzzu")
//    public void unione() throws IOException {
//        TimeSeriesData timeSeriesData = objectMapper.readValue(new File( "data/muzzu.json"), TimeSeriesData.class);
//
//        timeSeriesDataRepository.save(timeSeriesData);
//    }

}