/*
package com.example.api.controller;

import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.api.dto.Requests.UserRequest;
import com.example.api.dto.Responses.UserResponse;
import com.example.api.service.UserService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(controllers = UserController.class)
@org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc(addFilters = false)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void createUser_shouldReturnCreated() throws Exception {
        UserRequest req = new UserRequest();
        req.setEmail("jane@example.com");
        req.setUName("Jane");
        req.setULastName("Doe");
        req.setAge(30);
        req.setPassword("Password1");

        UserResponse resp = new UserResponse();
        resp.setId(1L);
        resp.setEmail(req.getEmail());
        resp.setUName(req.getUName());
        resp.setULastName(req.getULastName());
        resp.setAge(req.getAge());

        when(userService.createUser(org.mockito.ArgumentMatchers.any(UserRequest.class))).thenReturn(resp);

        mockMvc.perform(post("/api/users").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req))).andExpect(status().isCreated())
                .andExpect(header().exists("Location")).andExpect(jsonPath("$.id").value(1));
    }

    @Test
    public void createUser_validationFails_shouldReturnBadRequest() throws Exception {
        UserRequest req = new UserRequest();
        req.setEmail("invalid-email");
        req.setUName("");
        req.setULastName("");
        req.setAge(15); // too young
        req.setPassword("short");

        mockMvc.perform(post("/api/users").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req))).andExpect(status().isBadRequest());
    }

    @Test
    public void getUserById_shouldReturnOk() throws Exception {
        UserResponse resp = new UserResponse();
        resp.setId(2L);
        resp.setEmail("john@example.com");
        resp.setUName("John");
        resp.setULastName("Smith");
        resp.setAge(40);

        when(userService.getUserById(2L)).thenReturn(resp);

        mockMvc.perform(get("/api/users/2")).andExpect(status().isOk()).andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.email").value("john@example.com"));
    }

    @Test
    public void deleteUser_shouldReturnNoContent() throws Exception {
        doNothing().when(userService).deleteUser(3L);

        mockMvc.perform(delete("/api/users/3")).andExpect(status().isNoContent());
    }

}
*/