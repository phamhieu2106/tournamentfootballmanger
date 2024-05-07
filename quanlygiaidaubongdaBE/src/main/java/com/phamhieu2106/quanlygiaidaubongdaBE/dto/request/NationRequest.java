package com.phamhieu2106.quanlygiaidaubongdaBE.dto.request;

import com.phamhieu2106.quanlygiaidaubongdaBE.entity.National;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class NationRequest {

    private Long id;

    @NotBlank
    private String nationCode;
    @NotBlank
    private String nationName;
    @NotNull
    private MultipartFile imageFile;
    public National map(National national) {

        national.setId(this.id);
        national.setNationName(this.nationName);
        national.setNationCode(this.nationCode);

        return national;
    }
}
