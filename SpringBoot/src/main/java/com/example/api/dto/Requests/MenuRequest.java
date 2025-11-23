package com.example.api.dto.Requests;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MenuRequest {

    @JsonProperty("start_date_week")
    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDateWeek;

    @JsonProperty("end_date_week")
    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDateWeek;

    // The specific date for which the client is assigning recipes (single day in the week)
    @JsonProperty("date")
    @NotNull
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Integer date;

    @Valid
    @NotNull
    private Meals meals = new Meals();

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Meals {
        @Valid
        private List<MealItem> breakfast = new ArrayList<>();

        @Valid
        private List<MealItem> lunch = new ArrayList<>();

        @Valid
        private List<MealItem> dinner = new ArrayList<>();
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class MealItem {
        @NotNull
        private Long recipeId;

        @NotNull
        @Positive
        private Integer people;
    }

}
