package com.ascii.soy.controller;

import com.ascii.soy.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
public class EmailTestController {

    private final EmailService emailService;

    public EmailTestController(EmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/email")
    public ResponseEntity<String> sendTestEmail(
            @RequestParam String to) {

        emailService.sendEmail(
                to,
                "SOY Email Test",
                "🎉 Email service is working perfectly!"
        );

        return ResponseEntity.ok("Email sent successfully");
    }
}

