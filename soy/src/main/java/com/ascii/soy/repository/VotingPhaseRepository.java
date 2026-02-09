package com.ascii.soy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ascii.soy.entity.VotingPhase;

public interface VotingPhaseRepository extends JpaRepository<VotingPhase, Long> {
}
