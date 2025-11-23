package com.example.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.api.entity.IngredientRecipe;

public interface IngredientRecipeRepository extends JpaRepository<IngredientRecipe, Long> {

    @Query("select ir from IngredientRecipe ir where ir.recipe.idRecipe = :recipeId")
    List<IngredientRecipe> findByRecipeId(@Param("recipeId") Long recipeId);

    @Query("select ir from IngredientRecipe ir where ir.recipe.idRecipe = :recipeId and ir.ingredient.id = :ingredientId")
    IngredientRecipe findByRecipeIdAndIngredientId(@Param("recipeId") Long recipeId, @Param("ingredientId") Long ingredientId);

    @Modifying
    @Transactional
    @Query("delete from IngredientRecipe ir where ir.recipe.idRecipe = :recipeId")
    void deleteByRecipeId(@Param("recipeId") Long recipeId);

}
