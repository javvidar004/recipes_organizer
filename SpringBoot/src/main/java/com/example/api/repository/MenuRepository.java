package com.example.api.repository;

import com.example.api.entity.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Long> {
	@Query(value = "SELECT ingredients.name,(SUM(cantidad*menu_recipe.number_people)) AS cantidad, unidades " +
					"FROM menus, menu_recipe, Ingredient_recipe, ingredients " +
					"WHERE menus.id_menu = menu_recipe.id_menu AND " + 
					"menu_recipe.id_recipe = ingredient_recipe.id_recipe AND " + 
					"ingredient_recipe.id_ingredient = ingredients.id_ingredient AND " + 
					"menus.id_menu = :menuId " + 
					"GROUP BY name, unidades;",
			nativeQuery = true)
	List<Object[]> findShoppingListByMenuId(@Param("menuId") Long menuId);

	// find a menu for a user matching exact week range
	Menu findByIdUserAndStartDateAndEndDate(Long idUser, java.time.LocalDate startDate, java.time.LocalDate endDate);
}
