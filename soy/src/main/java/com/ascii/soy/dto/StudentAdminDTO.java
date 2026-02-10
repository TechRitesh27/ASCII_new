package com.ascii.soy.dto;

public class StudentAdminDTO {

    private Long id;
    private String collegeId;
    private String fullName;
    private String email;

    private String studentClass;
    private String division;
    private Integer rollNumber;

    private boolean active;

    // constructor + getters

    public StudentAdminDTO(Long id, String collegeId, String fullName, String email, String studentClass, String division, Integer rollNumber, boolean active) {
        this.id = id;
        this.collegeId = collegeId;
        this.fullName = fullName;
        this.email = email;
        this.studentClass = studentClass;
        this.division = division;
        this.rollNumber = rollNumber;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public String getCollegeId() {
        return collegeId;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getStudentClass() {
        return studentClass;
    }

    public String getDivision() {
        return division;
    }

    public Integer getRollNumber() {
        return rollNumber;
    }

    public boolean isActive() {
        return active;
    }
}
