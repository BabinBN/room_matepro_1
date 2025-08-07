package customer.room_matepro.config;

import org.springframework.security.config.Customizer;
import org.springframework.http.HttpMethod;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .securityMatcher("/**") // Apply to all requests
            .cors(Customizer.withDefaults()) // Enable CORS
            .csrf(csrf -> csrf.disable()) // Disable CSRF for simplicity
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll() // Allow preflight
                .requestMatchers("/login/**").permitAll() // Allow login without auth
                .anyRequest().authenticated() // Other requests need authentication
            )
            .httpBasic(Customizer.withDefaults()); // Optional: use basic auth

        return http.build();
    }
}