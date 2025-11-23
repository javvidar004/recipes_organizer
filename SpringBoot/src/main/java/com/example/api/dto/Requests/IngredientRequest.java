package com.example.api.dto.Requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class IngredientRequest {

    @NotBlank(message = "Name is empty")
    private String name;

    @PositiveOrZero(message = "Calories must be zero or positive")
    private Double calories;

    @PositiveOrZero(message = "Cost must be zero or positive")
    private Double cost;

}
