package com.ascii.soy.service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.ascii.soy.dto.FacultyResponseDTO;
import com.ascii.soy.dto.StudentAdminDTO;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ascii.soy.dto.AddFacultyRequest;
import com.ascii.soy.entity.Role;
import com.ascii.soy.entity.User;
import com.ascii.soy.repository.UserRepository;

@Service
public class AdminService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public AdminService(UserRepository userRepo,
                        PasswordEncoder passwordEncoder,
                        EmailService emailService) {

        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }

    /* =====================================================
       ADD FACULTY
       ===================================================== */

    public FacultyResponseDTO addFaculty(AddFacultyRequest request) {

        if (userRepo.findByEmail(request.getEmail()).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Faculty with this email already exists"
            );
        }

        String collegeId = generateFacultyId();
        String tempPassword = generateTempPassword();

        User faculty = new User();
        faculty.setCollegeId(collegeId);
        faculty.setFullName(request.getFullName());
        faculty.setEmail(request.getEmail());
        faculty.setDepartment(request.getDepartment());
        faculty.setDesignation(request.getDesignation());
        faculty.setContactNumber(request.getContactNumber());
        faculty.setRole(Role.FACULTY);
        faculty.setPassword(passwordEncoder.encode(tempPassword));
        faculty.setActive(true);

        User savedFaculty = userRepo.save(faculty);

        boolean emailSent = true;

        try {
            emailService.sendFacultyCredentials(
                    savedFaculty.getEmail(),
                    savedFaculty.getFullName(),
                    collegeId,
                    tempPassword
            );
        } catch (Exception ex) {
            emailSent = false;
            System.err.println("⚠️ Email failed: " + ex.getMessage());
        }

        return mapToFacultyDTO(savedFaculty, emailSent);
    }

    /* =====================================================
       GET ALL FACULTY (RETURN DTO, NOT ENTITY)
       ===================================================== */

    public List<FacultyResponseDTO> getAllFaculty() {

        return userRepo.findByRole(Role.FACULTY)
                .stream()
                .map(user -> mapToFacultyDTO(user, true))
                .collect(Collectors.toList());
    }

    /* =====================================================
       GET ALL STUDENTS (ADMIN VIEW)
       ===================================================== */

    public List<StudentAdminDTO> getAllStudents() {

        return userRepo.findByRole(Role.STUDENT)
                .stream()
                .map(user -> new StudentAdminDTO(
                        user.getId(),
                        user.getCollegeId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getStudentClass() != null
                                ? user.getStudentClass().name()
                                : null,
                        user.getDivision(),
                        user.getRollNumber(),
                        user.isActive()
                ))
                .collect(Collectors.toList());
    }

    /* =====================================================
       ENABLE / DISABLE USER
       ===================================================== */

    public void updateUserStatus(Long userId, boolean active) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        if (user.getRole() == Role.ADMIN) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Admin account cannot be disabled"
            );
        }

        user.setActive(active);
        userRepo.save(user);
    }

    /* =====================================================
       PRIVATE MAPPERS
       ===================================================== */

    private FacultyResponseDTO mapToFacultyDTO(User user, boolean emailSent) {

        return new FacultyResponseDTO(
                user.getCollegeId(),
                user.getFullName(),
                user.getEmail(),
                user.getDepartment(),
                user.getDesignation(),
                user.isActive(),
                emailSent
        );
    }

    /* =====================================================
       UTILITIES
       ===================================================== */

    private String generateFacultyId() {

        long facultyCount = userRepo.countByRole(Role.FACULTY);
        return "FAC" + String.format("%03d", facultyCount + 1);
    }

    private String generateTempPassword() {
        return UUID.randomUUID()
                .toString()
                .replace("-", "")
                .substring(0, 8);
    }
}
