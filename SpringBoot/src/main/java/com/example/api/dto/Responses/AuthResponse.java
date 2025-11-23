package com.example.api.dto.Responses;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {

    private String token;
    private Long userId;

    public AuthResponse() {}

    public AuthResponse(String token, Long userId) {
        this.token = token;
        this.userId = userId;
    }
}
