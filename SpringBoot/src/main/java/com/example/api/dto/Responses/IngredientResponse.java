package com.example.api.dto.Responses;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class IngredientResponse {

    private Long id;
    private String name;
    private Double calories;
    private Double cost;

}
