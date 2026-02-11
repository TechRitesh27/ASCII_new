package com.ascii.soy.service;

import com.ascii.soy.dto.ResetPasswordRequest;
import com.ascii.soy.dto.LoginRequest;
import com.ascii.soy.dto.LoginResponse;
import com.ascii.soy.dto.RegisterRequest;
import com.ascii.soy.entity.Role;
import com.ascii.soy.entity.User;
import com.ascii.soy.repository.UserRepository;
import com.ascii.soy.security.JwtUtil;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final OtpService otpService;

    public AuthService(
            UserRepository userRepo,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            OtpService otpService) {

        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.otpService = otpService;
    }

    /* =====================================================
       LOGIN
       ===================================================== */

    public LoginResponse login(LoginRequest request) {

        User user = userRepo.findByCollegeId(request.getCollegeId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED,
                                "Invalid College ID"
                        )
                );

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid password"
            );
        }

        if (!user.isActive()) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "User account is inactive. Contact admin."
            );
        }

        String token = jwtUtil.generateToken(
                user.getCollegeId(),
                user.getRole().name()
        );

        return new LoginResponse(
                token,
                user.getCollegeId(),
                user.getRole()
        );
    }

    /* =====================================================
       REGISTER
       ===================================================== */

    public LoginResponse register(RegisterRequest request) {

        if (userRepo.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email already registered"
            );
        }

        User student = new User();
        student.setFullName(request.getFullName());
        student.setStudentClass(request.getStudentClass());
        student.setDivision(request.getDivision());
        student.setRollNumber(request.getRollNumber());
        student.setContactNumber(request.getContactNumber());
        student.setEmail(request.getEmail());

        student.setCollegeId(generateStudentCollegeId());
        student.setPassword(passwordEncoder.encode(request.getPassword()));
        student.setRole(Role.STUDENT);
        student.setActive(true);

        userRepo.save(student);

        String token = jwtUtil.generateToken(
                student.getCollegeId(),
                student.getRole().name()
        );

        return new LoginResponse(
                token,
                student.getCollegeId(),
                student.getRole()
        );
    }

    /* =====================================================
       RESET PASSWORD
       ===================================================== */

    // 1️⃣ Send Reset OTP
    public void sendResetOtp(String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Email not registered"
                ));

        // Call dedicated reset OTP method
        otpService.sendResetOtp(email);
    }

    // 2️⃣ Optional: Verify OTP separately
    public void verifyResetOtp(String email, String otp) {
        otpService.verifyOtp(email, otp);
    }

    // 3️⃣ Final Reset Password
    public void resetPassword(ResetPasswordRequest request) {

        User user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        // Verify OTP before changing password
        otpService.verifyOtp(request.getEmail(), request.getOtp());

        // Encode and update password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepo.save(user);

        // Delete OTP after successful reset
        otpService.deleteOtp(request.getEmail());
    }

    /* =====================================================
       UTIL
       ===================================================== */

    private String generateStudentCollegeId() {
        long studentCount = userRepo.countByRole(Role.STUDENT);
        return "STU" + String.format("%04d", studentCount + 1);
    }
}
