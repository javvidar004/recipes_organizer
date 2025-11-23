package com.example.api.entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;

import java.util.Set;
import java.util.HashSet;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;     
import jakarta.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "recipes")
@Getter
@Setter
public class Recipe {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRecipe;

    @NotBlank(message = "Name is empty")
    @Size(min = 2, max = 100)
    private String name;

    @Column(nullable = true)
    private String description;

    @Column(nullable = true)
    private Integer prepTime;

    @NotNull
    private Long idType;

    @ManyToMany(fetch = FetchType.LAZY, cascade = { })
    @JoinTable(name = "Ingredient_Recipe",
        joinColumns = @JoinColumn(name = "id_recipe"),
        inverseJoinColumns = @JoinColumn(name = "id_ingredient"))
    private Set<Ingredient> ingredients = new HashSet<>();

}
/*Ingredient_Recipe */ 