package nextDevs.CapstonebackEnd.controller;

import nextDevs.CapstonebackEnd.dto.TimeSeriesDataDTO;
import nextDevs.CapstonebackEnd.model.TimeSeriesData;
import nextDevs.CapstonebackEnd.service.TimeSeriesDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timeseriesdata")
public class TimeSeriesDataController {

    @Autowired
    private TimeSeriesDataService timeSeriesDataService;

    @GetMapping
    public List<TimeSeriesDataDTO> getAllTimeSeriesData() {
        return timeSeriesDataService.findAll();
    }

    @GetMapping("/{id}")
    public TimeSeriesDataDTO getTimeSeriesDataById(@PathVariable Long id) {
        return timeSeriesDataService.findById(id);
    }

//    // Metodo per gestire una lista di risultati
//    @GetMapping("/someField/{someField}")
//    public List<TimeSeriesData> getBySomeField(@PathVariable String someField) {
//        return timeSeriesDataService.findBySomeField(someField);
//    }

    @PostMapping
    public ResponseEntity<TimeSeriesDataDTO> createTimeSeriesData(@RequestBody TimeSeriesDataDTO timeSeriesDataDTO) {
        TimeSeriesDataDTO savedTimeSeriesData = timeSeriesDataService.save(timeSeriesDataDTO);
        return new ResponseEntity<>(savedTimeSeriesData, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public TimeSeriesDataDTO updateTimeSeriesData(@PathVariable Long id, @RequestBody TimeSeriesDataDTO timeSeriesDataDTO) {
        timeSeriesDataDTO.setId(id);
        return timeSeriesDataService.save(timeSeriesDataDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteTimeSeriesData(@PathVariable Long id) {
        timeSeriesDataService.deleteById(id);
    }
}
