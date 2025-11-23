package com.example.api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Long idUser;

    @Email
    private String email;

    @NotBlank(message = "Name is empty")
    @Size(min = 2, max = 100)
    @Column(name = "u_name")
    private String UName;

    @NotBlank(message = "Last Name is empty")
    @Size(min = 2, max = 100)
    @Column(name = "u_lastname")
    private String ULastName;

    @NotBlank(message = "Password is empty")
    private String password;

    // Getters and setters
}