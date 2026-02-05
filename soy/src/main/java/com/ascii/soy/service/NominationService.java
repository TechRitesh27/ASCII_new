package com.ascii.soy.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ascii.soy.dto.FacultyNominationDTO;
import com.ascii.soy.dto.NominationRequest;
import com.ascii.soy.entity.*;
import com.ascii.soy.repository.*;

@Service
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

        // 🔒 BE-only eligibility
        if (student.getStudentClass() != StudentClass.BE) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Only BE students are eligible for nomination");
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
                     STUDENT — AUTO CHECK
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

    /**
     * Faculty nomination list with evaluation status
     * Fixes: faculty still seeing "Evaluate" after evaluation
     */
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

    public void shortlistNomination(Long id) {

        Nomination nomination = nominationRepo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Nomination not found"));

        if (nomination.getStatus() != NominationStatus.SUBMITTED) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Only submitted nominations can be shortlisted");
        }

        List<FacultyEvaluation> evaluations =
                evaluationRepo.findByNomination(nomination);

        if (evaluations.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Cannot shortlist without faculty evaluation");
        }

        nomination.setStatus(NominationStatus.SHORTLISTED);
        nominationRepo.save(nomination);
    }



    /* ==========================================================
                     STUDENT VOTING — STEP 9
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
