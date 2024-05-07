package com.phamhieu2106.quanlygiaidaubongdaBE.service;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.Image;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public interface ImageService {

    Image uploadImage(MultipartFile file) throws IOException;

    Image updateImage(Long id,MultipartFile file) throws  IOException;
}
