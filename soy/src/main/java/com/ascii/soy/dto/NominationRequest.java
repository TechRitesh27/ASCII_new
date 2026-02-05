package com.ascii.soy.dto;

public class NominationRequest {

    private Double cgpa;
    private String majorProject;
    private String internshipDetails;
    private String achievements;
    private String leadershipRole;
    private String proofLink;

    // Getters and Setters

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
}
