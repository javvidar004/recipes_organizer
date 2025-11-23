package com.example.api.dto.Requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class changePasswordRequest {

    @NotBlank
    private String CurrentPassword;

    @NotBlank
    @Size(min = 8, message = "Password must be at least 8 characters")
    @jakarta.validation.constraints.Pattern(regexp = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*",
        message = "Password must contain at least one uppercase letter, one lowercase letter and one digit")
    private String newPassword;

    @NotBlank
    private String confirmPassword;
}
