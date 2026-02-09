package com.ascii.soy.dto;

public class FinalResultResponse {

    private String studentName;
    private String collegeId;

    // Faculty raw average (0–90)
    private double facultyScore;

    // Raw vote count
    private long votingScore;

    // Final weighted score (0–100)
    private double finalScore;

    public FinalResultResponse(String studentName,
                               String collegeId,
                               double facultyScore,
                               long votingScore,
                               double finalScore) {

        this.studentName = studentName;
        this.collegeId = collegeId;
        this.facultyScore = facultyScore;
        this.votingScore = votingScore;
        this.finalScore = finalScore;
    }

    public String getStudentName() {
        return studentName;
    }

    public String getCollegeId() {
        return collegeId;
    }

    public double getFacultyScore() {
        return facultyScore;
    }

    public long getVotingScore() {
        return votingScore;
    }

    public double getFinalScore() {
        return finalScore;
    }
}
