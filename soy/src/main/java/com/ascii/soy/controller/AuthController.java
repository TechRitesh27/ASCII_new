package com.ascii.soy.controller;

import com.ascii.soy.dto.LoginRequest;
import com.ascii.soy.dto.LoginResponse;
import com.ascii.soy.dto.RegisterRequest;
import com.ascii.soy.dto.ResetPasswordRequest;
import com.ascii.soy.service.AuthService;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /* =====================================================
       LOGIN
       ===================================================== */
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request) {

        return ResponseEntity.ok(authService.login(request));
    }

    /* =====================================================
       STUDENT REGISTRATION (AUTO-LOGIN)
       ===================================================== */
    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(
            @Valid @RequestBody RegisterRequest request) {


        LoginResponse response = authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}
