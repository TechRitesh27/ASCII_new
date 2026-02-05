package com.ascii.soy.security;

import java.nio.charset.StandardCharsets; import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims; import io.jsonwebtoken.JwtException; import io.jsonwebtoken.Jwts; import io.jsonwebtoken.SignatureAlgorithm; import io.jsonwebtoken.security.Keys;

@Component public class JwtUtil {

    // Must be at least 32 chars for HS256
    private static final String SECRET =
            "soy_secret_key_for_ascii_project_123456";

    private static final long EXPIRATION_TIME =
            1000 * 60 * 60 * 10; // 10 hours

    private final SecretKey key =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    /* ================= TOKEN CREATION ================= */

    public String generateToken(String collegeId, String role) {

        return Jwts.builder()
                .setSubject(collegeId)
                .claim("role", role) // STUDENT / FACULTY / ADMIN
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + EXPIRATION_TIME)
                )
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    /* ================= TOKEN VALIDATION ================= */

    public boolean isTokenValid(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException ex) {
            return false;
        }
    }

    /* ================= CLAIM EXTRACTION ================= */

    public String extractCollegeId(String token) {
        return parseClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return parseClaims(token).get("role", String.class);
    }

    /* ================= INTERNAL ================= */

    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}