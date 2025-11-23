package com.example.api.dto.Responses;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RecipeResponse {

    private Long id;
    private Long userIdAdd;
    private String name;
    private String description;
    private Integer prepTime;
    private Long typeId;
    private Boolean publicRecipe;
    private java.util.List<com.example.api.dto.Responses.IngredientInRecipeResponse> ingredients;

}
