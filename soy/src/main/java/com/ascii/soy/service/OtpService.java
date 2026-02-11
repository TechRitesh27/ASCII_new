package com.ascii.soy.service;

import com.ascii.soy.entity.OtpVerification;
import com.ascii.soy.repository.OtpVerificationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class OtpService {

    private final OtpVerificationRepository otpRepo;
    private final EmailService emailService;

    public OtpService(OtpVerificationRepository otpRepo,
                      EmailService emailService) {
        this.otpRepo = otpRepo;
        this.emailService = emailService;
    }

    /* ================= REGISTRATION OTP ================= */

    @Transactional
    public void sendRegistrationOtp(String email) {

        String otp = generateOtp();
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(5);

        otpRepo.deleteByEmail(email);

        OtpVerification otpEntity =
                new OtpVerification(email, otp, expiry);

        otpRepo.save(otpEntity);

        emailService.sendRegistrationOtpEmail(email, otp);
    }

    /* ================= RESET PASSWORD OTP ================= */

    @Transactional
    public void sendResetOtp(String email) {

        String otp = generateOtp();
        LocalDateTime expiry = LocalDateTime.now().plusMinutes(5);

        otpRepo.deleteByEmail(email);

        OtpVerification otpEntity =
                new OtpVerification(email, otp, expiry);

        otpRepo.save(otpEntity);

        emailService.sendResetOtpEmail(email, otp);
    }

    /* ================= VERIFY OTP ================= */

    public void verifyOtp(String email, String otpInput) {

        OtpVerification otp = otpRepo.findByEmail(email)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.BAD_REQUEST,
                                "OTP not found"
                        ));

        if (otp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "OTP expired"
            );
        }

        if (!otp.getOtp().equals(otpInput)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Invalid OTP"
            );
        }

        otp.setVerified(true);
        otpRepo.save(otp);
    }

    @Transactional
    public void deleteOtp(String email) {
        otpRepo.deleteByEmail(email);
    }

    private String generateOtp() {
        return String.valueOf(100000 + new Random().nextInt(900000));
    }

    public boolean isOtpVerified(String email) {

        OtpVerification otp = otpRepo.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "OTP not found"
                ));

        if (otp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "OTP expired"
            );
        }

        return otp.isVerified();
    }

}
