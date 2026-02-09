package com.ascii.soy.service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.ascii.soy.dto.FacultyNominationDTO;
import com.ascii.soy.dto.NominationRequest;
import com.ascii.soy.entity.*;
import com.ascii.soy.repository.*;

@Service
@Transactional
public class NominationService {

    private final NominationRepository nominationRepo;
    private final UserRepository userRepo;
    private final FacultyEvaluationRepository evaluationRepo;

    public NominationService(
            NominationRepository nominationRepo,
            UserRepository userRepo,
            FacultyEvaluationRepository evaluationRepo) {

        this.nominationRepo = nominationRepo;
        this.userRepo = userRepo;
        this.evaluationRepo = evaluationRepo;
    }

    /* ==========================================================
                       STUDENT — NOMINATION
       ========================================================== */

    public Nomination submitNomination(String collegeId,
                                       NominationRequest request) {

        User student = userRepo.findByCollegeId(collegeId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Student not found"));

        if (student.getRole() != Role.STUDENT) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only students can submit nominations");
        }

        if (student.getStudentClass() != StudentClass.BE) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only BE students are eligible");
        }

        if (nominationRepo.existsByStudent(student)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Nomination already submitted");
        }

        Nomination nomination = new Nomination();
        nomination.setStudent(student);
        nomination.setCgpa(request.getCgpa());
        nomination.setMajorProject(request.getMajorProject());
        nomination.setInternshipDetails(request.getInternshipDetails());
        nomination.setAchievements(request.getAchievements());
        nomination.setLeadershipRole(request.getLeadershipRole());
        nomination.setProofLink(request.getProofLink());
        nomination.setStatus(NominationStatus.SUBMITTED);

        return nominationRepo.save(nomination);
    }

    /* ==========================================================
                     STUDENT — VIEW OWN NOMINATION
       ========================================================== */

    public Optional<Nomination> getMyNomination(String collegeId) {

        User student = userRepo.findByCollegeId(collegeId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Student not found"));

        return nominationRepo.findByStudent(student);
    }

    /* ==========================================================
                        FACULTY — VIEW LIST
       ========================================================== */

    public List<FacultyNominationDTO> getNominationsForFaculty(String facultyCollegeId) {

        User faculty = userRepo.findByCollegeId(facultyCollegeId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Faculty not found"));

        if (faculty.getRole() != Role.FACULTY) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Access denied");
        }

        return nominationRepo.findAll().stream().map(nomination -> {

            boolean alreadyEvaluated =
                    evaluationRepo.existsByFacultyAndNomination(
                            faculty, nomination);

            return new FacultyNominationDTO(
                    nomination.getId(),
                    nomination.getStudent().getFullName(),
                    nomination.getStudent().getStudentClass(),
                    nomination.getCgpa(),
                    nomination.getStatus(),
                    alreadyEvaluated
            );

        }).collect(Collectors.toList());
    }

    /* ==========================================================
                    ADMIN — GENERATE SHORTLIST (OPTION C)
       ========================================================== */

    public void generateShortlist() {

        List<Nomination> reviewed =
                nominationRepo.findByStatus(NominationStatus.UNDER_REVIEW);

        if (reviewed.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "No nominations available for shortlisting");
        }

        // Sort by averageScore descending
        List<Nomination> sorted = reviewed.stream()
                .sorted(Comparator.comparingDouble(
                        Nomination::getAverageScore).reversed())
                .toList();

        for (int i = 0; i < sorted.size(); i++) {

            Nomination nomination = sorted.get(i);

            if (i < 3) {
                nomination.setStatus(NominationStatus.SHORTLISTED);
            } else {
                nomination.setStatus(NominationStatus.REJECTED);
            }

            nominationRepo.save(nomination);
        }
    }

    /* ==========================================================
                     STUDENT VOTING — VIEW SHORTLIST
       ========================================================== */

    public List<Nomination> getShortlistedNominations() {

        List<Nomination> shortlisted =
                nominationRepo.findByStatus(NominationStatus.SHORTLISTED);

        if (shortlisted.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "No shortlisted nominations available");
        }

        return shortlisted;
    }
}
