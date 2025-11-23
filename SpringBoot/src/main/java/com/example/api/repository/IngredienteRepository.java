package com.example.api.repository;

import com.example.api.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface IngredienteRepository extends JpaRepository<Ingredient, Long> {

	@Query(value = "SELECT ir.cantidad FROM Ingredient_Recipe ir WHERE ir.id_recipe = :recipeId AND ir.id_ingredient = :ingredientId", nativeQuery = true)
	Double findCantidadByRecipeIdAndIngredientId(@Param("recipeId") Long recipeId, @Param("ingredientId") Long ingredientId);

	@Query(value = "SELECT ir.unidades FROM Ingredient_Recipe ir WHERE ir.id_recipe = :recipeId AND ir.id_ingredient = :ingredientId", nativeQuery = true)
	String findUnidadesByRecipeIdAndIngredientId(@Param("recipeId") Long recipeId, @Param("ingredientId") Long ingredientId);

}
