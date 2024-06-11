package nextDevs.CapstonebackEnd.controller;

import nextDevs.CapstonebackEnd.dto.TimeSeriesValueDTO;
import nextDevs.CapstonebackEnd.service.TimeSeriesValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/timeseriesvalues")
public class TimeSeriesValueController {

    @Autowired
    private TimeSeriesValueService timeSeriesValueService;

    @GetMapping
    public List<TimeSeriesValueDTO> getAllTimeSeriesValues() {
        return timeSeriesValueService.findAll();
    }

    @GetMapping("/{id}")
    public TimeSeriesValueDTO getTimeSeriesValueById(@PathVariable Long id) {
        return timeSeriesValueService.findById(id);
    }

    @PostMapping
    public TimeSeriesValueDTO createTimeSeriesValue(@RequestBody TimeSeriesValueDTO timeSeriesValueDTO) {
        return timeSeriesValueService.save(timeSeriesValueDTO);
    }

    @PutMapping("/{id}")
    public TimeSeriesValueDTO updateTimeSeriesValue(@PathVariable Long id, @RequestBody TimeSeriesValueDTO timeSeriesValueDTO) {
        timeSeriesValueDTO.setId(id);
        return timeSeriesValueService.save(timeSeriesValueDTO);
    }

    @DeleteMapping("/{id}")
    public void deleteTimeSeriesValue(@PathVariable Long id) {
        timeSeriesValueService.deleteById(id);
    }
}
