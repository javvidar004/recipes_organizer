package com.example.api.dto.Responses;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class IngredientInRecipeResponse {

    private Long id;
    private String name;
    // amount used in the recipe (cantidad in join table)
    private Double cantidad;
    // units for the amount (unidades) if present in join table
    private String unidades;

}
