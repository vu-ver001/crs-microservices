// purpose: sinh JWT khi login thanh cong; class nay se duoc COPY sang
// course-service va registration-service (ban rut gon, chi giu phan validate)
// de tung service tu xac thuc token
package vn.edu.crs.auth_service.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration-ms}")
    private long expirationMs;

    // Them tham so userId, giu nguyen logic ky token nhu Buoi 4
    public String generateToken(Long userId, String username, String role) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .subject(username)
                .claim("userId", userId)
                .claim("role", role)
                .issuedAt(now)
                .expiration(expiry)
                .signWith(key)
                .compact();
    }
}
