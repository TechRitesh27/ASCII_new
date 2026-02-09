package com.ascii.soy.controller;

import com.ascii.soy.dto.FacultyResponseDTO;
import com.ascii.soy.entity.Role;
import com.ascii.soy.entity.VotingPhase;
import com.ascii.soy.repository.VotingPhaseRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.ascii.soy.dto.AddFacultyRequest;
import com.ascii.soy.entity.User;
import com.ascii.soy.service.AdminService;
import com.ascii.soy.service.NominationService;

import jakarta.validation.Valid;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')") // Apply to entire controller
public class AdminController {

    private final AdminService adminService;
    private final NominationService nominationService;
    private final VotingPhaseRepository votingPhaseRepository;


    public AdminController(AdminService adminService,
                           NominationService nominationService,
                           VotingPhaseRepository votingPhaseRepository) {
        this.adminService = adminService;
        this.nominationService = nominationService;
        this.votingPhaseRepository = votingPhaseRepository;
    }


    /* ================= FACULTY ================= */

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
    public ResponseEntity<FacultyResponseDTO> addFaculty(
            @Valid @RequestBody AddFacultyRequest request) {

        FacultyResponseDTO faculty = adminService.addFaculty(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(faculty);
    }


    /* ================= ENABLE / DISABLE ================= */

    @PutMapping("/users/{id}/status")
    public ResponseEntity<?> updateUserStatus(
            @PathVariable Long id,
            @RequestParam boolean active) {

        adminService.updateUserStatus(id, active);
        return ResponseEntity.ok("User status updated");
    }

    /* ================= SHORTLIST GENERATION ================= */

    @PutMapping("/shortlist/generate")
    public ResponseEntity<?> generateShortlist() {

        nominationService.generateShortlist();
        return ResponseEntity.ok("Shortlist generated successfully");
    }

    @PutMapping("/voting/open")
    public ResponseEntity<?> openVoting() {

        VotingPhase phase = votingPhaseRepository.findById(1L)
                .orElseGet(() -> {
                    VotingPhase newPhase = new VotingPhase();
                    return votingPhaseRepository.save(newPhase);
                });

        phase.setVotingOpen(true);
        votingPhaseRepository.save(phase);

        return ResponseEntity.ok("Voting opened successfully");
    }

    @PutMapping("/voting/close")
    public ResponseEntity<?> closeVoting() {

        VotingPhase phase = votingPhaseRepository.findById(1L)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Voting phase not initialized"));

        phase.setVotingOpen(false);
        votingPhaseRepository.save(phase);

        return ResponseEntity.ok("Voting closed successfully");
    }

    @GetMapping("/voting/status")
    public ResponseEntity<Boolean> getVotingStatus() {

        VotingPhase phase = votingPhaseRepository.findById(1L)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Voting phase not initialized"));

        return ResponseEntity.ok(phase.isVotingOpen());
    }
    
}
