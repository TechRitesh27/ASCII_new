package com.ascii.soy.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ascii.soy.dto.FacultyEvaluationRequest;
import com.ascii.soy.entity.FacultyEvaluation;
import com.ascii.soy.service.FacultyEvaluationService;

@RestController
@RequestMapping("/api/faculty/evaluations")
public class FacultyEvaluationController {

    private final FacultyEvaluationService evaluationService;

    public FacultyEvaluationController(FacultyEvaluationService evaluationService) {
        this.evaluationService = evaluationService;
    }

    /**
     * Faculty evaluates a nomination
     * ROLE_FACULTY only (enforced by SecurityConfig)
     */
    @PostMapping("/{nominationId}")
    public ResponseEntity<FacultyEvaluation> evaluateNomination(
            @PathVariable Long nominationId,
            @RequestBody FacultyEvaluationRequest request,
            Authentication authentication) {

        // Extract faculty identity from JWT
        String facultyCollegeId = authentication.getName();

        FacultyEvaluation evaluation =
                evaluationService.evaluate(
                        facultyCollegeId,
                        nominationId,
                        request
                );

        return ResponseEntity.ok(evaluation);
    }
}
