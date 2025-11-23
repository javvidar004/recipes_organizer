package com.example.api.dto.Responses;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MealItemResponse {
    private Long recipeId;
    private String recipeName;
    private Integer people;
}
