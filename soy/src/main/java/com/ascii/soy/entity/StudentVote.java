package com.ascii.soy.entity;

import jakarta.persistence.*;

@Entity
@Table(
        name = "student_votes",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = { "voter_id" })
        }
)
public class StudentVote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * Student who casts the vote
     * Identity always comes from JWT
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "voter_id", nullable = false)
    private User voter;

    /**
     * Nomination that the student voted for
     */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "nomination_id", nullable = false)
    private Nomination nomination;

    // ---------------- Constructors ----------------

    public StudentVote() {
    }

    // ---------------- Getters & Setters ----------------

    public Long getId() {
        return id;
    }

    public User getVoter() {
        return voter;
    }

    public void setVoter(User voter) {
        this.voter = voter;
    }

    public Nomination getNomination() {
        return nomination;
    }

    public void setNomination(Nomination nomination) {
        this.nomination = nomination;
    }
}
