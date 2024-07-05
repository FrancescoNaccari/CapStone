package nextDevs.CapstonebackEnd.configuration;

import nextDevs.CapstonebackEnd.dto.LogoBorsaDTO;
import nextDevs.CapstonebackEnd.dto.StockListDTO;
import nextDevs.CapstonebackEnd.dto.TimeSeriesDataDTO;
import nextDevs.CapstonebackEnd.dto.TimeSeriesValueDTO;
import nextDevs.CapstonebackEnd.repository.GenericService;
import nextDevs.CapstonebackEnd.service.LogoBorsaService;
import nextDevs.CapstonebackEnd.service.StockListService;
import nextDevs.CapstonebackEnd.service.TimeSeriesDataService;
import nextDevs.CapstonebackEnd.service.TimeSeriesValueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.function.Function;
import java.util.stream.Collectors;

@Configuration
public class DataLoaderConfig implements ApplicationRunner {


    @Value("${data.load.enabled}")
    private boolean loadEnabled;

    @Value("${data.load.folder}")
    private String dataFolder;

    private final ResourceLoader resourceLoader;
    private final ObjectMapper objectMapper;
    private final Map<Class<?>, GenericService<?>> serviceMap;

    @Autowired
    public DataLoaderConfig(ResourceLoader resourceLoader,
                            ObjectMapper objectMapper,
                            List<GenericService<?>> services) {
        this.resourceLoader = resourceLoader;
        this.objectMapper = objectMapper;
        this.serviceMap = services.stream()
                .collect(Collectors.toMap(GenericService::getType, Function.identity()));
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (loadEnabled) {
            Files.list(Paths.get(dataFolder))
                    .filter(Files::isRegularFile)
                    .forEach(file -> {
                        String fileName = file.getFileName().toString();
                        try {
                            if (fileName.endsWith(".json")) {
                                Class<?> clazz = inferClassFromFileName(fileName);
                                loadJsonData(fileName, clazz);
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                    });
        }
    }

    private <T> void loadJsonData(String fileName, Class<T[]> clazz) throws IOException {
        Resource resource = resourceLoader.getResource("classpath:" + dataFolder + fileName);
        try (InputStream inputStream = resource.getInputStream()) {
            T[] objects = objectMapper.readValue(inputStream, clazz);
            GenericService<T> service = (GenericService<T>) serviceMap.get(clazz.getComponentType());
            if (service != null) {
                Arrays.stream(objects).forEach(service::save);
            }
        }
    }

    private Class<?> inferClassFromFileName(String fileName) {
        if (fileName.contains("logo_borsa")) {
            return LogoBorsaDTO[].class;
        } else if (fileName.contains("stock_list")) {
            return StockListDTO[].class;
        } else if (fileName.contains("time_series_data")) {
            return TimeSeriesDataDTO[].class;
        } else if (fileName.contains("time_series_value")) {
            return TimeSeriesValueDTO[].class;
        } else {
            throw new IllegalArgumentException("Unknown file type: " + fileName);
        }
    }
}
