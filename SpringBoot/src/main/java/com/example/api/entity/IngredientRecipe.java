package com.example.api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Ingredient_Recipe")
@Getter
@Setter
@NoArgsConstructor
public class IngredientRecipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_recipe")
    private Recipe recipe;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_ingredient")
    private Ingredient ingredient;

    @Column(name = "cantidad")
    private Integer cantidad;

    @Column(name = "unidades")
    private String unidades;

    public IngredientRecipe(Long id, Recipe recipe, Ingredient ingredient, Integer cantidad, String unidades) {
        this.id = id;
        this.recipe = recipe;
        this.ingredient = ingredient;
        this.cantidad = cantidad;
        this.unidades = unidades;
    }

}
