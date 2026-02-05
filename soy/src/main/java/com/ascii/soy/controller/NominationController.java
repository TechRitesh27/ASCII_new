package com.ascii.soy.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ascii.soy.dto.NominationRequest;
import com.ascii.soy.entity.Nomination;
import com.ascii.soy.service.NominationService;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/nominations")
public class NominationController {

    private final NominationService nominationService;

    public NominationController(NominationService nominationService) {
        this.nominationService = nominationService;
    }

    /**
     * Submit nomination
     * Accessible only by STUDENT role (enforced via SecurityConfig)
     * College ID is extracted from JWT (no manual IDs)
     */
    @PostMapping("/submit")
    public ResponseEntity<?> submitNomination(
            @RequestBody NominationRequest request,
            Authentication authentication) {

        String collegeId = authentication.getName(); // from JWT
        return ResponseEntity.ok(
                nominationService.submitNomination(collegeId, request)
        );
    }

    @GetMapping("/my")
    public ResponseEntity<?> getMyNomination(Authentication authentication) {

        String collegeId = authentication.getName();
        return nominationService.getMyNomination(collegeId)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "No nomination found"
                ));
    }

    @PutMapping("/admin/shortlist/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> shortlistNomination(@PathVariable Long id) {
        nominationService.shortlistNomination(id);
        return ResponseEntity.ok("Nomination shortlisted successfully");
    }


}
