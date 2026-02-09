package com.ascii.soy.controller;

import java.util.List;

import com.ascii.soy.dto.FacultyNominationDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import com.ascii.soy.entity.Nomination;
import com.ascii.soy.service.NominationService;

@RestController
@RequestMapping("/api/faculty")
@PreAuthorize("hasRole('FACULTY')")
public class FacultyNominationController {

    private final NominationService nominationService;

    public FacultyNominationController(NominationService nominationService) {
        this.nominationService = nominationService;
    }

    /**
     * Get all student nominations
     * ROLE_FACULTY only
     */
    @GetMapping("/nominations")
    public ResponseEntity<List<FacultyNominationDTO>> getNominations(
            Authentication authentication) {

        String facultyCollegeId = authentication.getName();

        return ResponseEntity.ok(
                nominationService.getNominationsForFaculty(facultyCollegeId)
        );
    }

}
