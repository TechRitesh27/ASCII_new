package com.ascii.soy.controller;

import com.ascii.soy.dto.LoginRequest;
import com.ascii.soy.dto.LoginResponse;
import com.ascii.soy.dto.RegisterRequest;
import com.ascii.soy.dto.ResetPasswordRequest;
import com.ascii.soy.service.AuthService;
import com.ascii.soy.service.OtpService;
import com.ascii.soy.repository.UserRepository;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;
    private final OtpService otpService;
    private final UserRepository userRepo;

    public AuthController(
            AuthService authService,
            OtpService otpService,
            UserRepository userRepo) {

        this.authService = authService;
        this.otpService = otpService;
        this.userRepo = userRepo;
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
       SEND REGISTRATION OTP
       ===================================================== */
    @PostMapping("/send-registration-otp")
    public ResponseEntity<?> sendRegistrationOtp(
            @RequestParam String email) {

        if (userRepo.existsByEmail(email)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already registered"
            );
        }

        otpService.sendRegistrationOtp(email);

        return ResponseEntity.ok("OTP sent successfully");
    }

    /* =====================================================
       VERIFY REGISTRATION OTP
       ===================================================== */
    @PostMapping("/verify-registration-otp")
    public ResponseEntity<?> verifyRegistrationOtp(
            @RequestParam String email,
            @RequestParam String otp) {

        otpService.verifyOtp(email, otp);

        return ResponseEntity.ok("OTP verified successfully");
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

    @PostMapping("/send-reset-otp")
    public ResponseEntity<?> sendResetOtp(@RequestParam String email) {

        authService.sendResetOtp(email);

        return ResponseEntity.ok("Reset OTP sent successfully");
    }

    @PostMapping("/verify-reset-otp")
    public ResponseEntity<?> verifyResetOtp(
            @RequestParam String email,
            @RequestParam String otp) {

        authService.verifyResetOtp(email, otp);

        return ResponseEntity.ok("OTP verified successfully");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(
            @Valid @RequestBody ResetPasswordRequest request) {

        authService.resetPassword(request);

        return ResponseEntity.ok("Password updated successfully");
    }

}
