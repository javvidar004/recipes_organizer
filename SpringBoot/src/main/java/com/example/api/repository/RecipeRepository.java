package com.example.api.repository;

import com.example.api.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {

	// Find all recipes marked as public
	// java.util.List<Recipe> findByPublicRecipeTrue();

}
