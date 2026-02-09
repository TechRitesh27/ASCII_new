package com.ascii.soy.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "voting_phase")
public class VotingPhase {

    @Id
    private Long id = 1L; // Only one row needed

    @Column(nullable = false)
    private boolean votingOpen = false;

    public VotingPhase() {}

    public Long getId() {
        return id;
    }

    public boolean isVotingOpen() {
        return votingOpen;
    }

    public void setVotingOpen(boolean votingOpen) {
        this.votingOpen = votingOpen;
    }
}
