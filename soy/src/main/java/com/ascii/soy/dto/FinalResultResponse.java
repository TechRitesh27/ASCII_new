package com.ascii.soy.dto;

public class FinalResultResponse {

    private String studentName;
    private String collegeId;
    private double facultyScore;
    private double votingScore;
    private double finalScore;

    public FinalResultResponse() {}

    public FinalResultResponse(String studentName, String collegeId,
                               double facultyScore, double votingScore,
                               double finalScore) {
        this.studentName = studentName;
        this.collegeId = collegeId;
        this.facultyScore = facultyScore;
        this.votingScore = votingScore;
        this.finalScore = finalScore;
    }

    // Getters and Setters

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getCollegeId() {
        return collegeId;
    }

    public void setCollegeId(String collegeId) {
        this.collegeId = collegeId;
    }

    public double getFacultyScore() {
        return facultyScore;
    }

    public void setFacultyScore(double facultyScore) {
        this.facultyScore = facultyScore;
    }

    public double getVotingScore() {
        return votingScore;
    }

    public void setVotingScore(double votingScore) {
        this.votingScore = votingScore;
    }

    public double getFinalScore() {
        return finalScore;
    }

    public void setFinalScore(double finalScore) {
        this.finalScore = finalScore;
    }
}

