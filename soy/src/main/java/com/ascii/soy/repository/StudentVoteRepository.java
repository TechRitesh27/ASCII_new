package com.ascii.soy.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ascii.soy.entity.StudentVote;
import com.ascii.soy.entity.User;
import com.ascii.soy.entity.Nomination;

public interface StudentVoteRepository extends JpaRepository<StudentVote, Long> {

    Optional<StudentVote> findByVoter(User voter);

    long countByNomination(Nomination nomination);

    boolean existsByVoter(User voter);

}
