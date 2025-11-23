package com.example.api.security;

import java.util.Date;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

import com.example.api.entity.User;

@Service
public class JwtService {

    private final String secret;
    private final long expirationMs;
    private final Algorithm algorithm;
    private final JWTVerifier verifier;

    // in-memory blacklist for logout (token -> expiry)
    private final Map<String, Long> blacklist = new ConcurrentHashMap<>();

    public JwtService(@Value("${jwt.secret}") String secret,
                      @Value("${jwt.expiration-ms}") long expirationMs) {
        this.secret = secret;
        this.expirationMs = expirationMs;
        this.algorithm = Algorithm.HMAC256(secret);
        this.verifier = JWT.require(this.algorithm).build();
    }

    public String generateToken(User user) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + expirationMs);
        return JWT.create()
            .withSubject(user.getEmail())
            .withClaim("id", user.getIdUser())
            .withIssuedAt(now)
            .withExpiresAt(exp)
            .sign(algorithm);
    }

    public boolean validateToken(String token) {
        try {
            if (isBlacklisted(token)) return false;
            DecodedJWT jwt = verifier.verify(token);
            return jwt.getExpiresAt() == null || jwt.getExpiresAt().after(new Date());
        } catch (JWTVerificationException ex) {
            return false;
        }
    }

    public String getEmailFromToken(String token) {
        DecodedJWT jwt = verifier.verify(token);
        return jwt.getSubject();
    }

    public void invalidateToken(String token) {
        try {
            DecodedJWT jwt = verifier.verify(token);
            Date exp = jwt.getExpiresAt();
            long expiry = exp != null ? exp.getTime() : (System.currentTimeMillis() + expirationMs);
            blacklist.put(token, expiry);
        } catch (JWTVerificationException ex) {
            // invalid token, ignore
        }
    }

    private boolean isBlacklisted(String token) {
        Long exp = blacklist.get(token);
        if (exp == null) return false;
        if (exp < System.currentTimeMillis()) {
            blacklist.remove(token);
            return false;
        }
        return true;
    }

}
