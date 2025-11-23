package com.example.api.dto.Responses;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MenuResponse {

    private List<MealItemResponse> breakfast = new ArrayList<>();
    private List<MealItemResponse> lunch = new ArrayList<>();
    private List<MealItemResponse> dinner = new ArrayList<>();
        private Long id;
}