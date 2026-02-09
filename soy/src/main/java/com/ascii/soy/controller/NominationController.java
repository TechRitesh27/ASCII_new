package com.ascii.soy.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ascii.soy.dto.NominationRequest;
import com.ascii.soy.service.NominationService;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/nominations")
public class NominationController {

    private final NominationService nominationService;

    public NominationController(NominationService nominationService) {
        this.nominationService = nominationService;
    }

    /* ==========================================================
                       STUDENT — SUBMIT NOMINATION
       ========================================================== */

    @PostMapping("/submit")
    public ResponseEntity<?> submitNomination(
            @RequestBody NominationRequest request,
            Authentication authentication) {

        String collegeId = authentication.getName();

        return ResponseEntity.ok(
                nominationService.submitNomination(collegeId, request)
        );
    }

    /* ==========================================================
                       STUDENT — VIEW OWN NOMINATION
       ========================================================== */

    @GetMapping("/my")
    public ResponseEntity<?> getMyNomination(Authentication authentication) {

        String collegeId = authentication.getName();

        return nominationService.getMyNomination(collegeId)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "No nomination found"
                ));
    }
}
