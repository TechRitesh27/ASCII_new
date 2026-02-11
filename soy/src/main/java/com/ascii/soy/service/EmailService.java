package com.ascii.soy.service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /* =====================================================
       COMMON EMAIL SENDER
       ===================================================== */

    public void sendEmail(String to, String subject, String body) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }

    /* =====================================================
       FACULTY CREDENTIAL EMAIL
       ===================================================== */

    public void sendFacultyCredentials(
            String toEmail,
            String fullName,
            String collegeId,
            String tempPassword) {

        String subject = "Faculty Account – Best Student of the Year";

        String body = """
                Dear %s,

                Your faculty account has been created.

                College ID: %s
                Temporary Password: %s

                Please login and reset your password immediately.

                Login URL: http://localhost:5173/login

                Regards,
                ASCII – SOY Team
                """.formatted(fullName, collegeId, tempPassword);

        sendEmail(toEmail, subject, body);
    }

    /* =====================================================
       REGISTRATION OTP EMAIL
       ===================================================== */

    public void sendRegistrationOtpEmail(String toEmail, String otp) {

        String subject = "ASCII Portal - Email Verification OTP";

        String body = """
                Your OTP for registration is: %s

                This OTP is valid for 5 minutes.
                Do not share it with anyone.

                - ASCII Portal
                """.formatted(otp);

        sendEmail(toEmail, subject, body);
    }

    /* =====================================================
       RESET PASSWORD OTP EMAIL
       ===================================================== */

    public void sendResetOtpEmail(String toEmail, String otp) {

        String subject = "ASCII Portal - Reset Password OTP";

        String body = """
                Your OTP to reset your password is: %s

                This OTP is valid for 5 minutes.
                Do not share it with anyone.

                If you did not request a password reset, please ignore this email.

                - ASCII Portal
                """.formatted(otp);

        sendEmail(toEmail, subject, body);
    }
}
