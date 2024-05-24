package com.phamhieu2106.quanlygiaidaubongdaBE.service.impl;

import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.AuthenRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.dto.request.UserRequest;
import com.phamhieu2106.quanlygiaidaubongdaBE.dto.response.AuthenResponse;
import com.phamhieu2106.quanlygiaidaubongdaBE.entity.User;
import com.phamhieu2106.quanlygiaidaubongdaBE.enumeration.Role;
import com.phamhieu2106.quanlygiaidaubongdaBE.repository.UserRepository;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.AuthenService;
import com.phamhieu2106.quanlygiaidaubongdaBE.service.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenServiceImpl implements AuthenService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenServiceImpl(UserRepository userRepository
            , PasswordEncoder passwordEncoder
            , JwtService jwtService, AuthenticationManager authenticationManager) {
        super();
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public AuthenResponse register(UserRequest userRequest) {
        User user = User.builder()
                .username(userRequest.getUsername())
                .email(userRequest.getEmail())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .role(Role.CLIENT)
                .build();

        userRepository.save(user);

        String token = jwtService.generateToken(user);

        return AuthenResponse.builder().token(token).build();

    }

    @Override
    public AuthenResponse authenticate(AuthenRequest authenRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenRequest.getUsername()
                        , authenRequest.getPassword())
        );

        User user = userRepository.findByUsername(authenRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Not found user"));

        String token = jwtService.generateToken(user);

        return AuthenResponse.builder().token(token).build();
        
    }
}
