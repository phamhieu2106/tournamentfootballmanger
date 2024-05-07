package com.phamhieu2106.quanlygiaidaubongdaBE.service.impl;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.NationRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Image;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.National;
import com.phamhieu2106.quanlygiaidaubongdaBE.exception.NotFoundException;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.ImageRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.NationalRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.ImageService;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.NationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class NationServiceImpl implements NationService {

    private final NationalRepository nationalRepository;
    private final ImageRepository imageRepository;
    private final ImageService imageService;

    @Autowired
    public NationServiceImpl(NationalRepository nationalRepository,
                             ImageRepository imageRepository,
                             ImageService imageService) {
        super();
        this.nationalRepository = nationalRepository;
        this.imageRepository = imageRepository;
        this.imageService = imageService;
    }

    @Override
    public List<National> getAll() {
        return nationalRepository.findAll();
    }

    @Override
    public National getOne(Long id) {
        return nationalRepository.findById(id).orElseThrow(()
                -> new NotFoundException("Not found Nation with id: " + id));
    }

    @Override
    public National add(NationRequest object) throws IOException {

        Image image = imageService.uploadImage(object.getImageFile());

        National national = object.map(new National());

        national.setImage(image);

        return nationalRepository.save(object.map(national));
    }

    @Override
    public National update(Long id, NationRequest object) throws IOException {
        Optional<National> optionalNational = nationalRepository.findById(id);
        // Nếu rỗng, kiểm tra xem tên file có là "default.jpg" hay không
        if (optionalNational.isPresent()) {
            if ("default.jpg".equals(object.getImageFile().getOriginalFilename())) {
                National national = optionalNational.get();
                National newNation = object.map(national);
                return nationalRepository.save(newNation);
            } else {
                National national = optionalNational.get();
                //            Image
                Optional<Image> optionalImage = imageRepository.findById(national.getImage().getId());
                Image image;
                if (optionalImage.isPresent()) {
                    image = imageService.updateImage(optionalImage.get().getId(), object.getImageFile());
                } else {
                    image = imageService.uploadImage(object.getImageFile());
                }
//            Nation
                National newNation = object.map(national);
                newNation.setImage(image);
                return nationalRepository.save(newNation);
            }

        }
        throw new NotFoundException("Can't not update Nation with id: " + id);
    }

    @Override
    public National remove(Long id) {
        throw new NotFoundException("Can't not delete Nation with id: " + id);
    }

}
