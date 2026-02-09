package com.ascii.soy.repository;

import java.util.List;
import java.util.Optional;

import com.ascii.soy.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ascii.soy.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByCollegeId(String collegeId);

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    List<User> findByRole(Role role);

    long countByRole(Role role);


    //
    boolean existsByCollegeId(String collegeId);
}

