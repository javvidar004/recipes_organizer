package com.example.api.dto.Requests;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class RecipeRequestPost {

    @NotBlank
    @Size(min = 2, max = 100)
    private String name;

    private String description;

    private Integer prepTime;

    @NotNull
    private Long typeId;

    // Optional list of ingredient objects with quantity and units
    @Valid
    private List<IngredientQuantity> ingredients;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class IngredientQuantity {
        @NotNull
        private Long ingredientId;

        @NotNull
        @Positive
        private Integer quantity;

        @NotNull
        @Pattern(regexp = "^(g|Kg|ml|L|unit)$", message = "units must be one of: g, Kg, ml, L, unit")
        private String units;
    }

}

// Example JSON:
//{
//  "name": "Spaghetti Bolognese",
//  "description": "Rich meat sauce with tomatoes and herbs.",
//  "prepTime": 45,
//  "typeId": 2,
//  "ingredients": [
//    { "ingredientId": 1, "quantity": 500, "units": "g" },
//    { "ingredientId": 2, "quantity": 2, "units": "tbsp" },
//    { "ingredientId": 3, "quantity": 1, "units": "pcs" }
//  ]
//}

// Prompt: Help me adapt the class to the example I have below, only adapt this class and then we will be adapting the other parts

/*
*/