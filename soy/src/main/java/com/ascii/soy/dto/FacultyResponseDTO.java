package com.ascii.soy.dto;

public class FacultyResponseDTO {

    private String collegeId;
    private String fullName;
    private String email;
    private String department;
    private String designation;
    private boolean active;
    private boolean emailSent;

    public FacultyResponseDTO(String collegeId,
                              String fullName,
                              String email,
                              String department,
                              String designation,
                              boolean active,
                              boolean emailSent) {

        this.collegeId = collegeId;
        this.fullName = fullName;
        this.email = email;
        this.department = department;
        this.designation = designation;
        this.active = active;
        this.emailSent = emailSent;
    }

    // getters


    public String getCollegeId() {
        return collegeId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getDepartment() {
        return department;
    }

    public String getDesignation() {
        return designation;
    }

    public boolean isActive() {
        return active;
    }

    public boolean isEmailSent() {
        return emailSent;
    }
}
