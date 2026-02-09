package com.ascii.soy.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class AddFacultyRequest {

    @NotBlank
    private String fullName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String department;

    @NotBlank
    private String designation;

    @Pattern(regexp = "^[0-9]{10}$", message = "Invalid contact number")
    private String contactNumber;


    // getters & setters

    public @NotBlank String getFullName() {
        return fullName;
    }

    public void setFullName(@NotBlank String fullName) {
        this.fullName = fullName;
    }

    public @NotBlank String getEmail() {
        return email;
    }

    public void setEmail(@NotBlank String email) {
        this.email = email;
    }

    public @NotBlank String getDepartment() {
        return department;
    }

    public void setDepartment(@NotBlank String department) {
        this.department = department;
    }

    public @NotBlank String getDesignation() {
        return designation;
    }

    public void setDesignation(@NotBlank String designation) {
        this.designation = designation;
    }

    public @NotBlank String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(@NotBlank String contactNumber) {
        this.contactNumber = contactNumber;
    }
}
