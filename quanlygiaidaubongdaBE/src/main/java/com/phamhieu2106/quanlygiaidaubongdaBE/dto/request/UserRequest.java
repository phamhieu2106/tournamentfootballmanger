package com.phamhieu2106.quanlygiaidaubongdaBE.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRequest {

    String username;
    String email;
    String password;
    String token;
}
