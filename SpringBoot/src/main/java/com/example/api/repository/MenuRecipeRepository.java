package com.example.api.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.api.entity.MenuRecipe;

public interface MenuRecipeRepository extends JpaRepository<MenuRecipe, Long> {

    @Query("select mr from MenuRecipe mr where mr.menu.id_menu = :menuId")
    List<MenuRecipe> findByMenuId(@Param("menuId") Long menuId);

    @Query("select mr from MenuRecipe mr where mr.menu.id_menu = :menuId and mr.dayRecipe = :dayRecipe and mr.mealType = :mealType")
    List<MenuRecipe> findByMenuIdAndDayAndMealType(@Param("menuId") Long menuId, @Param("dayRecipe") Integer dayRecipe, @Param("mealType") String mealType);

    @Modifying
    @Transactional
    @Query("delete from MenuRecipe mr where mr.menu.id_menu = :menuId and mr.dayRecipe = :dayRecipe and mr.mealType = :mealType")
    void deleteByMenuIdAndDayAndMealType(@Param("menuId") Long menuId, @Param("dayRecipe") Integer dayRecipe, @Param("mealType") String mealType);

    @Modifying
    @Transactional
    @Query("delete from MenuRecipe mr where mr.menu.id_menu = :menuId and mr.dayRecipe between :start and :end")
    void deleteByMenuIdAndDayBetween(@Param("menuId") Long menuId, @Param("start") LocalDate start, @Param("end") LocalDate end);

}
