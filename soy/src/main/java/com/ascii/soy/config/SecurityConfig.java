package com.ascii.soy.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ascii.soy.security.JwtAuthenticationFilter;

@Configuration
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

                        /* ---------- PUBLIC ---------- */
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        /* ---------- STUDENT ---------- */
                        .requestMatchers("/api/nominations/**")
                        .hasAuthority("ROLE_STUDENT")
                        .requestMatchers("/api/votes/**")
                        .hasAuthority("ROLE_STUDENT")

                        /* ---------- FACULTY ---------- */
                        .requestMatchers("/api/faculty/**")
                        .hasAuthority("ROLE_FACULTY")

                        /* ---------- ADMIN ---------- */
                        .requestMatchers("/api/admin/**")
                        .hasAuthority("ROLE_ADMIN")
                        .requestMatchers("/api/results/**")
                        .hasAuthority("ROLE_ADMIN")

                        /* ---------- FALLBACK ---------- */
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
