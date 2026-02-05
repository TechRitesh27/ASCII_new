package com.ascii.soy.controller;

import com.ascii.soy.entity.Role;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ascii.soy.dto.AddFacultyRequest;
import com.ascii.soy.entity.User;
import com.ascii.soy.service.AdminService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

//    @PostMapping("/faculty")
//    public ResponseEntity<User> addFaculty(
//            @Valid @RequestBody AddFacultyRequest request) {
//
//        return ResponseEntity.ok(
//                adminService.addFaculty(request)
//        );
//    }

    @GetMapping("/faculty")
    public ResponseEntity<List<User>> getAllFaculty() {
        return ResponseEntity.ok(
                adminService.getAllFaculty()
        );
    }

    @GetMapping("/users/{role}")
    public ResponseEntity<List<User>> getUsersByRole(
            @PathVariable Role role) {

        return ResponseEntity.ok(
                adminService.getUsersByRole(role)
        );
    }

    @PostMapping("/faculty/add")
    public ResponseEntity<User> addFaculty(
            @RequestBody AddFacultyRequest request) {

        User faculty = adminService.addFaculty(request);
        return ResponseEntity.ok(faculty);
    }



    /* ================= ENABLE / DISABLE ================= */

    @PutMapping("/users/{id}/status")
    public ResponseEntity<?> updateUserStatus(
            @PathVariable Long id,
            @RequestParam boolean active) {

        adminService.updateUserStatus(id, active);
        return ResponseEntity.ok("User status updated");
    }
}
