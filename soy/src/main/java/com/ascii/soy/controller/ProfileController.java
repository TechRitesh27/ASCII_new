package com.ascii.soy.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.ascii.soy.entity.User;
import com.ascii.soy.service.ProfileService;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<User> getMyProfile(Authentication authentication) {

        String collegeId = authentication.getName(); // from JWT
        return ResponseEntity.ok(
                profileService.getProfile(collegeId)
        );
    }
}
