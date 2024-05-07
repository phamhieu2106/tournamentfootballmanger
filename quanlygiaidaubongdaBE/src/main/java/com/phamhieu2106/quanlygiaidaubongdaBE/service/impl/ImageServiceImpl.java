package com.phamhieu2106.quanlygiaidaubongdaBE.service.impl;


import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Image;
import com.phamhieu2106.quanlygiaidaubongdaBE.exception.NotFoundException;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.ImageRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.ImageService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Map;

@Service
@Transactional
public class ImageServiceImpl implements ImageService {
    private Cloudinary cloudinary;
    private ImageRepository imageRepository;

    @Autowired
    public ImageServiceImpl(ImageRepository imageRepository,
                            Cloudinary cloudinary) {
        super();
        this.imageRepository = imageRepository;
        this.cloudinary = cloudinary;
    }

    @Override
    public Image uploadImage(MultipartFile imageFile) throws IOException {
        // Convert MultipartFile to File
        File file = convert(imageFile);

        // Upload file to Cloudinary
        Map uploadResult = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());

        // Save URL to database
        Image image = new Image();
        image.setPictureURL((String) uploadResult.get("url"));
        return imageRepository.save(image);
    }

    @Override
    public Image updateImage(Long id,MultipartFile imageFile) throws IOException {
        // Convert MultipartFile to File
        File file = convert(imageFile);

        // Upload file to Cloudinary
        Map uploadResult = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());

        // Find Image
        Image image = imageRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Can't find image with id:" + id));

        image.setPictureURL((String) uploadResult.get("url"));

        return imageRepository.save(image);
    }

    private static File convert(MultipartFile multipartFile) throws IOException {
        // Extracting bytes from multipartFile
        byte[] fileBytes = multipartFile.getBytes();

        // Creating a temporary file
        File file = File.createTempFile("temp", null);

        // Writing bytes to the temporary file
        try (FileOutputStream fos = new FileOutputStream(file)) {
            fos.write(fileBytes);
        }

        return file;
    }
}
