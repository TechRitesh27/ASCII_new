package com.ascii.soy.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ascii.soy.entity.Nomination;
import com.ascii.soy.entity.User;
import com.ascii.soy.entity.NominationStatus;

public interface NominationRepository extends JpaRepository<Nomination, Long> {

    Optional<Nomination> findByStudent(User student);
//    List<Nomination> findByStatus(NominationStatus status);
    boolean existsByStudent(User student);
    List<Nomination> findByStatus(NominationStatus status);

}
