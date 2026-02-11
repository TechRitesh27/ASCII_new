package com.ascii.soy.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ascii.soy.dto.RegisterRequest;
import com.ascii.soy.dto.LoginResponse;
import com.ascii.soy.entity.Role;
import com.ascii.soy.entity.User;
import com.ascii.soy.repository.UserRepository;
import com.ascii.soy.security.JwtUtil;

@Service
public class RegistrationService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final OtpService otpService;

    public RegistrationService(
            UserRepository userRepo,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            OtpService otpService) {

        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.otpService = otpService;
    }

    public LoginResponse register(RegisterRequest req) {

        // 1️⃣ Duplicate email check
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already registered"
            );
        }

        // 2️⃣ OTP must be verified
        if (!otpService.isOtpVerified(req.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email not verified. Please verify OTP first."
            );
        }

        // 3️⃣ Generate College ID
        String collegeId = generateCollegeId(req);

        // 4️⃣ Create User
        User user = new User();
        user.setCollegeId(collegeId);
        user.setFullName(req.getFullName());
        user.setEmail(req.getEmail());
        user.setContactNumber(req.getContactNumber());
        user.setStudentClass(req.getStudentClass());
        user.setDivision(req.getDivision());
        user.setRollNumber(req.getRollNumber());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRole(Role.STUDENT);
        user.setActive(true);

        userRepo.save(user);

        // 5️⃣ Delete OTP after successful registration
        otpService.deleteOtp(req.getEmail());

        // 6️⃣ Auto-login
        String token = jwtUtil.generateToken(
                user.getCollegeId(),
                user.getRole().name()
        );

        return new LoginResponse(token, user.getCollegeId(), user.getRole());
    }

    private String generateCollegeId(RegisterRequest req) {

        return req.getStudentClass() + "-"
                + req.getDivision() + "-"
                + String.format("%03d", req.getRollNumber());
    }
}
