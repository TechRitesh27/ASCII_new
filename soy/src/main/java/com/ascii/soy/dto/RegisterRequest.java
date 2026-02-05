package com.ascii.soy.dto;

import jakarta.validation.constraints.*;

import com.ascii.soy.entity.StudentClass;

public class RegisterRequest {

    @NotBlank
    private String fullName;

    @NotNull
    private StudentClass studentClass;

    @NotBlank
    private String division;

    @NotNull
    @Min(1)
    private Integer rollNumber;

    @Pattern(regexp = "^[0-9]{10}$", message = "Invalid contact number")
    private String contactNumber;

    @Email
    private String email;

    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;

    // getters & setters

    public @NotBlank String getFullName() {
        return fullName;
    }

    public void setFullName(@NotBlank String fullName) {
        this.fullName = fullName;
    }

    public @NotNull StudentClass getStudentClass() {
        return studentClass;
    }

    public void setStudentClass(@NotNull StudentClass studentClass) {
        this.studentClass = studentClass;
    }

    public @NotBlank String getDivision() {
        return division;
    }

    public void setDivision(@NotBlank String division) {
        this.division = division;
    }

    public @NotNull @Min(1) Integer getRollNumber() {
        return rollNumber;
    }

    public void setRollNumber(@NotNull @Min(1) Integer rollNumber) {
        this.rollNumber = rollNumber;
    }

    public @Pattern(regexp = "^[0-9]{10}$", message = "Invalid contact number") String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(@Pattern(regexp = "^[0-9]{10}$", message = "Invalid contact number") String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public @Email String getEmail() {
        return email;
    }

    public void setEmail(@Email String email) {
        this.email = email;
    }

    public @Size(min = 6, message = "Password must be at least 6 characters") String getPassword() {
        return password;
    }

    public void setPassword(@Size(min = 6, message = "Password must be at least 6 characters") String password) {
        this.password = password;
    }
}
