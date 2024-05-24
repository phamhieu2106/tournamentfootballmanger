package com.phamhieu2106.quanlygiaidaubongdaBE.service;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.AuthenRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.UserRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.dto.response.AuthenResponse;

public interface AuthenService {
    AuthenResponse register(UserRequest userRequest);

    AuthenResponse authenticate(AuthenRequest authenRequest);
}
