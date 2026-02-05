package com.ascii.soy.dto;

import com.ascii.soy.entity.Role;

public class LoginResponse {

    private String token;
    private String collegeId;
    private Role role;

    public LoginResponse(String token, String collegeId, Role role) {
        this.token = token;
        this.collegeId = collegeId;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public String getCollegeId() {
        return collegeId;
    }

    public Role getRole() {
        return role;
    }
}
