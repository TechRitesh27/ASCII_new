package com.ascii.soy.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ascii.soy.repository.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner updatePasswords(UserRepository repo, PasswordEncoder encoder) {
        return args -> {
            repo.findAll().forEach(user -> {
                if (user.getPassword() == null || user.getPassword().isEmpty()) {
                    user.setPassword(encoder.encode("password123"));
                    repo.save(user);
                }
            });
        };
    }
}
