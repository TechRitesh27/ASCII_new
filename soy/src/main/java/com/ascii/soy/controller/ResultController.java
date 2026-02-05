package com.ascii.soy.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ascii.soy.dto.FinalResultResponse;
import com.ascii.soy.service.ResultService;

@RestController
@RequestMapping("/api/results")
public class ResultController {

    private final ResultService resultService;

    public ResultController(ResultService resultService) {
        this.resultService = resultService;
    }

    /**
     * Get Best Student of the Year
     * ADMIN-only (secured via SecurityConfig)
     */
    @GetMapping("/winner")
    public ResponseEntity<FinalResultResponse> getWinner() {

        FinalResultResponse result = resultService.getWinner();
        return ResponseEntity.ok(result);
    }
}
