package com.example.api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.api.dto.Requests.MenuRequest;
import com.example.api.dto.Responses.MenuResponse;
import com.example.api.dto.Responses.ShoppingItemResponse;
import com.example.api.entity.Menu;
import com.example.api.exception.NotFoundException;
import com.example.api.repository.MenuRepository;
import com.example.api.repository.MenuRecipeRepository;
import com.example.api.repository.RecipeRepository;
import com.example.api.entity.MenuRecipe;
import com.example.api.entity.Recipe;
import java.time.LocalDate;

@Service
public class MenuService {

    private final MenuRepository menuRepository;
    private final MenuRecipeRepository menuRecipeRepository;
    private final RecipeRepository recipeRepository;

    public MenuService(MenuRepository menuRepository, MenuRecipeRepository menuRecipeRepository, RecipeRepository recipeRepository) {
        this.menuRepository = menuRepository;
        this.menuRecipeRepository = menuRecipeRepository;
        this.recipeRepository = recipeRepository;
    }
    /*
    @Transactional
    public MenuResponse createMenu(MenuRequest request) {
        Menu menu = mapRequestToEntity(request);
        Menu saved = menuRepository.save(menu);
        return mapToResponse(saved);
    }
 */
    @Transactional(readOnly = true)
    public List<MenuResponse> getAllMenus() {
        return menuRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MenuResponse getMenuById(Long userId, com.example.api.dto.Requests.MenuRequestGet request) {
        java.time.LocalDate start = request.getStartDate();
        java.time.LocalDate end = request.getEndDate();
        java.time.LocalDate day = request.getDate();

        Integer dayNumber = (day != null) ? Integer.valueOf(day.getDayOfMonth()) : null;

        Menu menu = menuRepository.findByIdUserAndStartDateAndEndDate(userId, start, end);
        MenuResponse resp = new MenuResponse();

        if (menu == null) {
            // no menu found for this user/week — return empty meal arrays
            return resp;
        }

        Long menuId = menu.getId_menu();

        // populate meals
        java.util.List<MenuRecipe> breakfast = menuRecipeRepository.findByMenuIdAndDayAndMealType(menuId, dayNumber, "breakfast");
        java.util.List<MenuRecipe> lunch = menuRecipeRepository.findByMenuIdAndDayAndMealType(menuId, dayNumber, "lunch");
        java.util.List<MenuRecipe> dinner = menuRecipeRepository.findByMenuIdAndDayAndMealType(menuId, dayNumber, "dinner");

        for (MenuRecipe mr : breakfast) {
            resp.getBreakfast().add(new com.example.api.dto.Responses.MealItemResponse(
                    mr.getRecipe().getIdRecipe(), mr.getRecipe().getName(), mr.getNumberPeople()));
        }
        for (MenuRecipe mr : lunch) {
            resp.getLunch().add(new com.example.api.dto.Responses.MealItemResponse(
                    mr.getRecipe().getIdRecipe(), mr.getRecipe().getName(), mr.getNumberPeople()));
        }
        for (MenuRecipe mr : dinner) {
            resp.getDinner().add(new com.example.api.dto.Responses.MealItemResponse(
                    mr.getRecipe().getIdRecipe(), mr.getRecipe().getName(), mr.getNumberPeople()));
        }

        return resp;
    }

    @Transactional
    public void deleteMenu(Long id) {
        if (!menuRepository.existsById(id)) {
            throw new NotFoundException("Menu not found with id: " + id);
        }
        menuRepository.deleteById(id);
    }

    @Transactional
    public void upsertMenuRecipes(Long userId, MenuRequest request) {
        // prefer path userId; if body includes userId validate it
        if (userId != null && !userId.equals(userId)) {
            throw new IllegalArgumentException("userId in path does not match body");
        }

        LocalDate start = request.getStartDateWeek();
        LocalDate end = request.getEndDateWeek();

        // find or create menu for this user/week
        Menu menu = menuRepository.findByIdUserAndStartDateAndEndDate(userId, start, end);
        if (menu == null) {
            Menu m = new Menu();
            m.setIdUser(userId);
            m.setStartDate(start);
            m.setEndDate(end);
            m.setTitle("Menu of the Week " + start + " to " + end);
            menu = menuRepository.save(m);
        }

        Integer dayOfWeek = request.getDate();

        // for each meal type: delete existing entries for that menu/day/mealType, then insert new ones if present
    processMealItems(menu, dayOfWeek, "breakfast", request.getMeals().getBreakfast());
    processMealItems(menu, dayOfWeek, "lunch", request.getMeals().getLunch());
    processMealItems(menu, dayOfWeek, "dinner", request.getMeals().getDinner());
    }

    private void processMealItems(Menu menu, Integer dayRecipe, String mealType, java.util.List<MenuRequest.MealItem> items) {
        // delete existing for menu/day/mealType
        menuRecipeRepository.deleteByMenuIdAndDayAndMealType(menu.getId_menu(), dayRecipe, mealType);

        if (items == null || items.isEmpty()) {
            return;
        }



        for (MenuRequest.MealItem it : items) {
            Long recipeId = it.getRecipeId();
            Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(() -> new NotFoundException("Recipe not found with id: " + recipeId));
            MenuRecipe mr = new MenuRecipe(menu, recipe, dayRecipe, it.getPeople(), mealType);
            menuRecipeRepository.save(mr);
        }
    }

    @Transactional(readOnly = true)
    public List<ShoppingItemResponse> getShoppingList(Long idUser, LocalDate startDate, LocalDate endDate) {
        // find menu for this user and week range, then retrieve shopping list by menu id
        Menu menu = menuRepository.findByIdUserAndStartDateAndEndDate(idUser, startDate, endDate);
        if (menu == null) {
            // return empty list when no menu exists for the given user and date range
            return java.util.Collections.emptyList();
        }

        Long menuId = menu.getId_menu();
        List<Object[]> rows = menuRepository.findShoppingListByMenuId(menuId);

        return rows.stream().map(r -> {
            String name = r[0] != null ? r[0].toString() : "";
            Double cantidad;
            if (r[1] instanceof Number) {
                cantidad = ((Number) r[1]).doubleValue();
            } else if (r[1] != null) {
                try {
                    cantidad = Double.valueOf(r[1].toString());
                } catch (NumberFormatException ex) {
                    cantidad = 0.0;
                }
            } else {
                cantidad = 0.0;
            }
            String unidades = r[2] != null ? r[2].toString() : "";
            return new ShoppingItemResponse(name, cantidad, unidades);
        }).collect(Collectors.toList());
    }
/*
    private Menu mapRequestToEntity(MenuRequest r) {
        Menu m = new Menu();
        m.setIdUser(r.getUserId());
        // request uses startDateWeek/endDateWeek
        m.setStartDate(r.getStartDateWeek());
        m.setEndDate(r.getEndDateWeek());
        // MenuRequest no longer includes a title; use an empty title or derive as needed
        m.setTitle("");
        return m;
    }
 */
    private MenuResponse mapToResponse(Menu m) {
        MenuResponse resp = new MenuResponse();
        resp.setId(m.getId_menu());
        return resp;
    }

}
