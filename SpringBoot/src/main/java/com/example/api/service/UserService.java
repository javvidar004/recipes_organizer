package com.example.api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.api.dto.Requests.UserRequest;
import com.example.api.dto.Requests.changePasswordRequest;
import com.example.api.dto.Requests.updateProfileRequest;
import com.example.api.dto.Responses.UserResponse;
import com.example.api.entity.User;
import com.example.api.exception.NotFoundException;
import com.example.api.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserResponse createUser(UserRequest request) {
        User u = new User();
        u.setEmail(request.getEmail());
        u.setUName(request.getUName());
        u.setULastName(request.getULastName());
    // Hash the password before saving
    u.setPassword(passwordEncoder.encode(request.getPassword()));
        User saved = userRepository.save(u);
        return mapToResponse(saved);
    }

    @Transactional
    public UserResponse register(String email, String rawPassword, String firstName, String lastName) {
        // avoid duplicate emails
        if (userRepository.findByEmail(email).isPresent()) {
            throw new IllegalArgumentException("Email already in use");
        }

        User u = new User();
        u.setEmail(email);
        // set safe defaults for required fields
        u.setUName(firstName);
        u.setULastName(lastName);
        u.setPassword(passwordEncoder.encode(rawPassword));

        User saved = userRepository.save(u);
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {
        User u = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found with id: " + id));
        return mapToResponse(u);
    }

    @Transactional
    public UserResponse updateUser(Long id, updateProfileRequest request) {
        User existing = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found with id: " + id));
        existing.setEmail(request.getEmail());
        existing.setUName(request.getFirstName());
        existing.setULastName(request.getLastName());
        User saved = userRepository.save(existing);
        return mapToResponse(saved);
    }

    public UserResponse updateUserPassword(Long id, changePasswordRequest request) {
        User existing = userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found with id: " + id));
        // Encode the new password before saving
        if (request.getNewPassword().equals(request.getConfirmPassword()) && passwordEncoder.matches(request.getCurrentPassword(), existing.getPassword())) {
            existing.setPassword(passwordEncoder.encode(request.getNewPassword()));
        } else {
            throw new IllegalArgumentException("New password and confirmation do not match");
        }
        User saved = userRepository.save(existing);
        return mapToResponse(saved);
    }

    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new NotFoundException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    private UserResponse mapToResponse(User u) {
        UserResponse resp = new UserResponse();
        resp.setId(u.getIdUser());
        resp.setEmail(u.getEmail());
        resp.setUName(u.getUName());
        resp.setULastName(u.getULastName());
        return resp;
    }

}
