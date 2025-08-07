package customer.room_matepro.Utilites;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;
import java.util.*;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "YourSecretKey123";

    public String generateToken(String email, String role) {
        return Jwts.builder()
            .setSubject(email)
            .claim("role", role)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 5)) // 5 hours
            .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
            .compact();
    }

    public Claims extractAllClaims(String token) {
        return Jwts.parser()
            .setSigningKey(SECRET_KEY)
            .parseClaimsJws(token)
            .getBody();
    }

    public boolean isTokenValid(String token, String email) {
        return extractAllClaims(token).getSubject().equals(email);
    }
}
