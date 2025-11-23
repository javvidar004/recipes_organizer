package com.example.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Menu_Recipe")
@Getter
@Setter
@NoArgsConstructor
public class MenuRecipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_menu", referencedColumnName = "id_menu")
    private Menu menu;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_recipe", referencedColumnName = "idRecipe")
    private Recipe recipe;

    @Column(name = "day_recipe")
    private Integer dayRecipe;

    @Column(name = "number_people")
    private Integer numberPeople;

    @Column(name = "meal_type")
    private String mealType; // should be one of: "breakfast","lunch","dinner"

    public MenuRecipe(Menu menu, Recipe recipe, Integer dayRecipe, Integer numberPeople, String mealType) {
        this.menu = menu;
        this.recipe = recipe;
        this.dayRecipe = dayRecipe;
        this.numberPeople = numberPeople;
        this.mealType = mealType;
    }

}
