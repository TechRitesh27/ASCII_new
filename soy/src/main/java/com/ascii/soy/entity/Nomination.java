package com.ascii.soy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "nominations")
public class Nomination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /* ================= STUDENT ================= */

    @OneToOne
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    private User student;

    /* ================= ACADEMIC ================= */

    private Double cgpa;

    @Column(length = 500)
    private String majorProject;

    @Column(length = 500)
    private String internshipDetails;

    @Column(length = 500)
    private String achievements;

    private String leadershipRole;

    private String proofLink;

    /* ================= EVALUATION ================= */

    private Double averageScore = 0.0;

    private Integer evaluationCount = 0;

    /* ================= VOTING ================= */

    private Integer voteCount = 0;

    /* ================= FINAL RESULT ================= */

    private Double finalScore = 0.0;

    /* ================= STATUS ================= */

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private NominationStatus status = NominationStatus.SUBMITTED;

    public Nomination() {}

    // Getters & Setters below (unchanged except new fields)

    // ... keep your existing getters/setters ...

    public Integer getEvaluationCount() {
        return evaluationCount;
    }

    public void setEvaluationCount(Integer evaluationCount) {
        this.evaluationCount = evaluationCount;
    }

    public Integer getVoteCount() {
        return voteCount;
    }

    public void setVoteCount(Integer voteCount) {
        this.voteCount = voteCount;
    }

    public Double getFinalScore() {
        return finalScore;
    }

    public void setFinalScore(Double finalScore) {
        this.finalScore = finalScore;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getStudent() {
        return student;
    }

    public void setStudent(User student) {
        this.student = student;
    }

    public Double getCgpa() {
        return cgpa;
    }

    public void setCgpa(Double cgpa) {
        this.cgpa = cgpa;
    }

    public String getMajorProject() {
        return majorProject;
    }

    public void setMajorProject(String majorProject) {
        this.majorProject = majorProject;
    }

    public String getInternshipDetails() {
        return internshipDetails;
    }

    public void setInternshipDetails(String internshipDetails) {
        this.internshipDetails = internshipDetails;
    }

    public String getAchievements() {
        return achievements;
    }

    public void setAchievements(String achievements) {
        this.achievements = achievements;
    }

    public String getLeadershipRole() {
        return leadershipRole;
    }

    public void setLeadershipRole(String leadershipRole) {
        this.leadershipRole = leadershipRole;
    }

    public String getProofLink() {
        return proofLink;
    }

    public void setProofLink(String proofLink) {
        this.proofLink = proofLink;
    }

    public Double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(Double averageScore) {
        this.averageScore = averageScore;
    }

    public NominationStatus getStatus() {
        return status;
    }

    public void setStatus(NominationStatus status) {
        this.status = status;
    }
}
