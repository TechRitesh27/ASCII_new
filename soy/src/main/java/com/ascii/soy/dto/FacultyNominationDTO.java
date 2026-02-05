package com.ascii.soy.dto;

import com.ascii.soy.entity.NominationStatus;
import com.ascii.soy.entity.StudentClass;

public class FacultyNominationDTO {

    private Long id;
    private String studentName;
    private StudentClass studentClass;
    private Double cgpa;
    private NominationStatus status;
    private boolean alreadyEvaluated;

    // ✅ No-args constructor (required by Spring / Jackson)
    public FacultyNominationDTO() {
    }

    // ✅ REQUIRED constructor (fixes your error)
    public FacultyNominationDTO(
            Long id,
            String studentName,
            StudentClass studentClass,
            Double cgpa,
            NominationStatus status,
            boolean alreadyEvaluated) {

        this.id = id;
        this.studentName = studentName;
        this.studentClass = studentClass;
        this.cgpa = cgpa;
        this.status = status;
        this.alreadyEvaluated = alreadyEvaluated;
    }

    // ================= GETTERS & SETTERS =================

    public Long getId() {
        return id;
    }

    public String getStudentName() {
        return studentName;
    }

    public StudentClass getStudentClass() {
        return studentClass;
    }

    public Double getCgpa() {
        return cgpa;
    }

    public NominationStatus getStatus() {
        return status;
    }

    public boolean isAlreadyEvaluated() {
        return alreadyEvaluated;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public void setStudentClass(StudentClass studentClass) {
        this.studentClass = studentClass;
    }

    public void setCgpa(Double cgpa) {
        this.cgpa = cgpa;
    }

    public void setStatus(NominationStatus status) {
        this.status = status;
    }

    public void setAlreadyEvaluated(boolean alreadyEvaluated) {
        this.alreadyEvaluated = alreadyEvaluated;
    }
}
