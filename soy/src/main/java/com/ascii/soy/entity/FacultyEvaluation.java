package com.ascii.soy.entity;

import jakarta.persistence.*;

@Entity
@Table(
        name = "faculty_evaluations",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"faculty_id", "nomination_id"})
        }
)
public class FacultyEvaluation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many evaluations can be done by one faculty
    @ManyToOne
    @JoinColumn(name = "faculty_id", nullable = false)
    private User faculty;

    // Many evaluations can exist for one nomination
    @ManyToOne   // ✅ FIXED (was OneToOne)
    @JoinColumn(name = "nomination_id", nullable = false)
    private Nomination nomination;

    // Scores
    private int academicScore;
    private int projectScore;
    private int activityScore;
    private int leadershipScore;
    private int disciplineScore;

    private int totalScore;

    public FacultyEvaluation() {}

    // ================= GETTERS & SETTERS =================

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getFaculty() { return faculty; }
    public void setFaculty(User faculty) { this.faculty = faculty; }

    public Nomination getNomination() { return nomination; }
    public void setNomination(Nomination nomination) { this.nomination = nomination; }

    public int getAcademicScore() { return academicScore; }
    public void setAcademicScore(int academicScore) { this.academicScore = academicScore; }

    public int getProjectScore() { return projectScore; }
    public void setProjectScore(int projectScore) { this.projectScore = projectScore; }

    public int getActivityScore() { return activityScore; }
    public void setActivityScore(int activityScore) { this.activityScore = activityScore; }

    public int getLeadershipScore() { return leadershipScore; }
    public void setLeadershipScore(int leadershipScore) { this.leadershipScore = leadershipScore; }

    public int getDisciplineScore() { return disciplineScore; }
    public void setDisciplineScore(int disciplineScore) { this.disciplineScore = disciplineScore; }

    public int getTotalScore() { return totalScore; }
    public void setTotalScore(int totalScore) { this.totalScore = totalScore; }
}
