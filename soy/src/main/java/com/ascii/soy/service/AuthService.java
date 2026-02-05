package com.ascii.soy.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ascii.soy.dto.LoginRequest;
import com.ascii.soy.dto.LoginResponse;
import com.ascii.soy.dto.RegisterRequest;
import com.ascii.soy.entity.Role;
import com.ascii.soy.entity.User;
import com.ascii.soy.repository.UserRepository;
import com.ascii.soy.security.JwtUtil;

@Service
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(
            UserRepository userRepo,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {

        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /* =====================================================
       LOGIN (STUDENT / FACULTY / ADMIN)
       ===================================================== */
    public LoginResponse login(LoginRequest request) {

        User user = userRepo.findByCollegeId(request.getCollegeId())
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.UNAUTHORIZED,
                                "Invalid College ID"
                        )
                );

        // 🔐 Password check
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "Invalid password"
            );
        }

        // 🚫 Active check
        if (!user.isActive()) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "User account is inactive. Contact admin."
            );
        }

        // ✅ Generate JWT
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
       STUDENT REGISTRATION
       ===================================================== */
    public LoginResponse register(RegisterRequest request) {

        if (userRepo.findByEmail(request.getEmail()).isPresent()) {
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
        student.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

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
       UTIL
       ===================================================== */
    private String generateStudentCollegeId() {
        return "STU" + (System.currentTimeMillis() % 100000);
    }
}
