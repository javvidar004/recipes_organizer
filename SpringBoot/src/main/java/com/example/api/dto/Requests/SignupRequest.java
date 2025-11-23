package com.example.api.dto.Requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {

    @Email
    @NotBlank
    private String email;

    @NotBlank
    @Size(min = 8, message = "Password must be at least 8 characters")
    @jakarta.validation.constraints.Pattern(regexp = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*",
    message = "Password must contain at least one uppercase letter, one lowercase letter and one digit")
    private String password;

    @NotBlank
    private String firstName;

    @NotBlank
    private String lastName;

}
