package nextDevs.CapstonebackEnd.service;


import com.opencsv.CSVReader;
import it.nextdevs.EpicEnergyServices.model.Comune;
import it.nextdevs.EpicEnergyServices.model.Provincia;
import it.nextdevs.EpicEnergyServices.repository.ComuneRepository;
import it.nextdevs.EpicEnergyServices.repository.ProvinciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;


@Service
public class CSVImportService {

    @Autowired
    private ProvinciaRepository provinciaRepository;

    @Autowired
    private ComuneRepository comuneRepository;


    @Transactional
    public void importProvince(MultipartFile file) throws Exception {
        try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
            String[] line;
            do {
                line = reader.readNext();
                System.out.println(line);
                if (line == null) {
                    continue;
                }
                System.out.println(line[0]);
                String[] lines = line[0].split(";");
                System.out.println(lines[0]);
                System.out.println(lines[0].length());
                if (lines[0] == null || lines[0].length() != 2) {
                    continue;
                }
                Provincia provincia = new Provincia();
                provincia.setSigla(lines[0]);
                provincia.setNome(lines[1]);
                provincia.setRegione(lines[2]);


                provinciaRepository.save(provincia);
            } while (line != null);
        }
    }

    @Transactional
    public void importComuni(MultipartFile file) throws Exception {
        Map<String, Provincia> provinceMap = new HashMap<>();
        provinciaRepository.findAll().forEach(provincia -> provinceMap.put(provincia.getNome(), provincia));

        try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
            String[] line = reader.readNext();
            do {
                line = reader.readNext();
                System.out.println(line);
                if (line == null) {
                    continue;
                }
                System.out.println(line[0]);
                String[] lines = line[0].split(";");
                System.out.println(lines[0]);
                System.out.println(lines[0].length());

                Comune comune = new Comune();
                comune.setCodiceProvincia(Integer.parseInt(lines[0]));
                comune.setCodiceComune(Integer.parseInt(lines[1]));
                comune.setNome(lines[2]); // Nome del comune
                comune.setProvincia(provinceMap.get(lines[3])); // Nome della provincia

                comuneRepository.save(comune);
            }   while (line != null);
        }
    }
}