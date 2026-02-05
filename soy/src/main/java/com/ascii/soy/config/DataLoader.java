package com.ascii.soy.config;

import com.ascii.soy.entity.StudentClass;
import com.ascii.soy.entity.User;
import com.ascii.soy.entity.Role;
import com.ascii.soy.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner loadUsers(UserRepository repo, PasswordEncoder encoder) {
        return args -> {

            if (repo.count() == 0) {

                // ---------- ADMIN ----------
                User admin = new User();
                admin.setCollegeId("ADMIN001");
                admin.setFullName("ASCII Admin");
                admin.setEmail("admin@college.edu");
                admin.setPassword(encoder.encode("password123"));
                admin.setRole(Role.ADMIN);
                admin.setActive(true);

                repo.save(admin);

//                // ---------- FACULTY ----------
//                User faculty = new User();
//                faculty.setCollegeId("FAC001");
//                faculty.setFullName("Faculty Member");
//                faculty.setEmail("faculty@college.edu");
//                faculty.setPassword(encoder.encode("password123"));
//                faculty.setRole(Role.FACULTY);
//                faculty.setActive(true);
//
//                repo.save(faculty);

                // ---------- STUDENT ----------
                User student = new User();
                student.setCollegeId("STU001");
                student.setFullName("Student One");
                student.setStudentClass(StudentClass.BE);
                student.setDivision("A");
                student.setRollNumber(1);
                student.setContactNumber("9999999999");
                student.setEmail("student@college.edu");
                student.setPassword(encoder.encode("password123"));
                student.setRole(Role.STUDENT);
                student.setActive(true);

                repo.save(student);
            }
        };
    }
}
