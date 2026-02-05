package com.ascii.soy.dto;

public class FacultyEvaluationRequest {

    private int academicScore;
    private int projectScore;
    private int activityScore;
    private int leadershipScore;
    private int disciplineScore;

    // Getters and Setters

    public int getAcademicScore() {
        return academicScore;
    }

    public void setAcademicScore(int academicScore) {
        this.academicScore = academicScore;
    }

    public int getProjectScore() {
        return projectScore;
    }

    public void setProjectScore(int projectScore) {
        this.projectScore = projectScore;
    }

    public int getActivityScore() {
        return activityScore;
    }

    public void setActivityScore(int activityScore) {
        this.activityScore = activityScore;
    }

    public int getLeadershipScore() {
        return leadershipScore;
    }

    public void setLeadershipScore(int leadershipScore) {
        this.leadershipScore = leadershipScore;
    }

    public int getDisciplineScore() {
        return disciplineScore;
    }

    public void setDisciplineScore(int disciplineScore) {
        this.disciplineScore = disciplineScore;
    }
}

