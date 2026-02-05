package com.ascii.soy.service;

import java.util.Comparator;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ascii.soy.dto.FacultyEvaluationRequest;
import com.ascii.soy.entity.*;
import com.ascii.soy.repository.*;

@Service
@Transactional
public class FacultyEvaluationService {

    private final FacultyEvaluationRepository evaluationRepo;
    private final UserRepository userRepo;
    private final NominationRepository nominationRepo;

    public FacultyEvaluationService(
            FacultyEvaluationRepository evaluationRepo,
            UserRepository userRepo,
            NominationRepository nominationRepo) {

        this.evaluationRepo = evaluationRepo;
        this.userRepo = userRepo;
        this.nominationRepo = nominationRepo;
    }

    public FacultyEvaluation evaluate(
            String facultyCollegeId,
            Long nominationId,
            FacultyEvaluationRequest request) {

        User faculty = userRepo.findByCollegeId(facultyCollegeId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "Faculty not found"));

        if (faculty.getRole() != Role.FACULTY) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Only faculty can evaluate");
        }

        Nomination nomination = nominationRepo.findById(nominationId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "Nomination not found"));

        if (evaluationRepo.existsByFacultyAndNomination(faculty, nomination)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "You have already evaluated this nomination");
        }

        int totalScore =
                request.getAcademicScore() +
                        request.getProjectScore() +
                        request.getActivityScore() +
                        request.getLeadershipScore() +
                        request.getDisciplineScore();

        FacultyEvaluation evaluation = new FacultyEvaluation();
        evaluation.setFaculty(faculty);
        evaluation.setNomination(nomination);
        evaluation.setAcademicScore(request.getAcademicScore());
        evaluation.setProjectScore(request.getProjectScore());
        evaluation.setActivityScore(request.getActivityScore());
        evaluation.setLeadershipScore(request.getLeadershipScore());
        evaluation.setDisciplineScore(request.getDisciplineScore());
        evaluation.setTotalScore(totalScore);

        evaluationRepo.save(evaluation);

        // 🔥 Recalculate average after every evaluation
        updateAverageScore(nomination);

        // 🔥 Auto shortlist top 3
        autoShortlistTopThree();

        return evaluation;
    }

    /* ================================
           AVERAGE CALCULATION
       ================================ */
    private void updateAverageScore(Nomination nomination) {

        List<FacultyEvaluation> evaluations =
                evaluationRepo.findByNomination(nomination);

        double average = evaluations.stream()
                .mapToInt(FacultyEvaluation::getTotalScore)
                .average()
                .orElse(0.0);

        nomination.setAverageScore(average);
        nominationRepo.save(nomination);
    }

    /* ================================
           AUTO SHORTLIST LOGIC
       ================================ */
    private void autoShortlistTopThree() {

        List<Nomination> all =
                nominationRepo.findAll().stream()
                        .filter(n -> n.getAverageScore() != null)
                        .sorted(Comparator.comparingDouble(
                                Nomination::getAverageScore).reversed())
                        .toList();

        for (int i = 0; i < all.size(); i++) {

            if (i < 3) {
                all.get(i).setStatus(NominationStatus.SHORTLISTED);
            } else {
                all.get(i).setStatus(NominationStatus.SUBMITTED);
            }

            nominationRepo.save(all.get(i));
        }
    }

    public List<FacultyEvaluation> getMyEvaluations(String facultyCollegeId) {

        User faculty = userRepo.findByCollegeId(facultyCollegeId)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "Faculty not found"));

        if (faculty.getRole() != Role.FACULTY) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only faculty can access this");
        }

        return evaluationRepo.findByFaculty(faculty);
    }

}
