package com.ascii.soy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ascii.soy.security.JwtAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth

                        /* ================= PUBLIC ENDPOINTS ================= */
                        .requestMatchers(
                                "/api/auth/**",
                                "/api/public/**",          // ✅ Public APIs
                                "/api/notices/active",
                                "/uploads/**"              // ✅ Uploaded images
                        ).permitAll()

                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        /* ================= STUDENT ================= */
                        .requestMatchers("/api/nominations/**")
                        .hasRole("STUDENT")

                        .requestMatchers("/api/votes/**")
                        .hasRole("STUDENT")

                        /* ================= FACULTY ================= */
                        .requestMatchers("/api/faculty/**")
                        .hasRole("FACULTY")

                        /* ================= ADMIN ================= */
                        .requestMatchers("/api/admin/**")
                        .hasRole("ADMIN")

                        .requestMatchers("/api/results/**")
                        .hasRole("ADMIN")

                        /* ================= DEFAULT ================= */
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
