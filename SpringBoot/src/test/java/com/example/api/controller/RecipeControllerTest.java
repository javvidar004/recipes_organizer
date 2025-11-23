/*
package com.example.api.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.api.dto.Requests.RecipeRequest;
import com.example.api.dto.Responses.RecipeResponse;
import com.example.api.service.RecipeService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(controllers = RecipeController.class)
@org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc(addFilters = false)
public class RecipeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RecipeService recipeService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void createRecipe_shouldReturnCreated() throws Exception {
        RecipeRequest req = new RecipeRequest();
        req.setUserIdAdd(1L);
        req.setName("Tomato Soup");
        req.setDescription("Tasty");
        req.setPrepTime(10);
        req.setTypeId(2L);
        req.setPublicRecipe(true);

        RecipeResponse resp = new RecipeResponse();
        resp.setId(10L);
        resp.setName(req.getName());
        resp.setUserIdAdd(req.getUserIdAdd());

        when(recipeService.createRecipe(org.mockito.ArgumentMatchers.any(RecipeRequest.class))).thenReturn(resp);

        mockMvc.perform(post("/api/recipes").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(req))).andExpect(status().isCreated())
                .andExpect(header().exists("Location")).andExpect(jsonPath("$.id").value(10));
    }

}
*/