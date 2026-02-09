package com.ascii.soy.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ascii.soy.entity.FacultyEvaluation;
import com.ascii.soy.service.FacultyEvaluationService;

@RestController
@RequestMapping("/api/faculty")
@PreAuthorize("hasRole('FACULTY')")
public class FacultyEvaluationHistoryController {

    private final FacultyEvaluationService evaluationService;

    public FacultyEvaluationHistoryController(
            FacultyEvaluationService evaluationService) {
        this.evaluationService = evaluationService;
    }

    // 🔹 History of logged-in faculty
    @GetMapping("/evaluations/my")
    public ResponseEntity<List<FacultyEvaluation>> getMyEvaluations(
            Authentication authentication) {

        String facultyCollegeId = authentication.getName();

        return ResponseEntity.ok(
                evaluationService.getMyEvaluations(facultyCollegeId)
        );
    }
}
