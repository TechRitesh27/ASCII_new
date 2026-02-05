package com.ascii.soy.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ascii.soy.entity.FacultyEvaluation;
import com.ascii.soy.entity.Nomination;
import com.ascii.soy.entity.User;

public interface FacultyEvaluationRepository
        extends JpaRepository<FacultyEvaluation, Long> {

    List<FacultyEvaluation> findByFaculty(User faculty);
    boolean existsByFacultyAndNomination(User faculty, Nomination nomination);
    Optional<FacultyEvaluation> findByFacultyAndNomination(User faculty, Nomination nomination);
    List<FacultyEvaluation> findByNomination(Nomination nomination);
}

