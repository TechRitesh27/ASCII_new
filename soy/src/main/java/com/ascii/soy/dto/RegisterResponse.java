package com.ascii.soy.dto;

import com.ascii.soy.entity.Role;

public class RegisterResponse {

    private String collegeId;
    private String token;
    private Role role;

    public RegisterResponse(String collegeId, String token, Role role) {
        this.collegeId = collegeId;
        this.token = token;
        this.role = role;
    }

    public String getCollegeId() {
        return collegeId;
    }

    public String getToken() {
        return token;
    }

    public Role getRole() {
        return role;
    }
}
