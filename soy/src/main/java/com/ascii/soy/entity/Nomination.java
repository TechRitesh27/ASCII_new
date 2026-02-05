package com.ascii.soy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "nominations")
public class Nomination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Link nomination to student
    @OneToOne
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    private User student;

    // Academic
    private Double cgpa;

    // Projects & Internship
    @Column(length = 500)
    private String majorProject;

    private String internshipDetails;

    // Achievements
    @Column(length = 500)
    private String achievements;

    // Leadership
    private String leadershipRole;

    // Proof URLs / file references
    private String proofLink;   // Google Drive / GitHub / PDF link

    // Average Calculation
    private Double averageScore;


    // Status tracking
    @Enumerated(EnumType.STRING)
    private NominationStatus status = NominationStatus.SUBMITTED;

    public Nomination() {}

    // Getters and Setters

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

    public NominationStatus getStatus() {
        return status;
    }

    public void setStatus(NominationStatus status) {
        this.status = status;
    }

    public Double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(Double averageScore) {
        this.averageScore = averageScore;
    }
}
