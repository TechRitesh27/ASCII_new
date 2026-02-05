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

    public void sendFacultyCredentials(
            String toEmail,
            String fullName,
            String collegeId,
            String tempPassword) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Faculty Account – Best Student of the Year");
        message.setText(
                "Dear " + fullName + ",\n\n" +
                        "Your faculty account has been created.\n\n" +
                        "College ID: " + collegeId + "\n" +
                        "Temporary Password: " + tempPassword + "\n\n" +
                        "Please login and reset your password immediately.\n\n" +
                        "Login URL: http://localhost:5173/login\n\n" +
                        "Regards,\n" +
                        "ASCII – SOY Team"
        );

        mailSender.send(message);
    }

    public void sendEmail(String to, String subject, String body) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
    }
}
