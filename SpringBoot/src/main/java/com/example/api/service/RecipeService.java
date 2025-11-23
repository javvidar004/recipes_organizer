package com.example.api.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.example.api.entity.IngredientRecipe;
import com.example.api.repository.IngredientRecipeRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.api.dto.Requests.RecipeRequestPost;
import com.example.api.dto.Responses.RecipeResponse;
import com.example.api.dto.Responses.IngredientInRecipeResponse;
import com.example.api.entity.Recipe;
import com.example.api.entity.Ingredient;
import com.example.api.exception.NotFoundException;
import com.example.api.repository.RecipeRepository;
import com.example.api.repository.IngredienteRepository;

@Service
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final IngredienteRepository ingredientRepository;
    private final IngredientRecipeRepository ingredientRecipeRepository;

    public RecipeService(RecipeRepository recipeRepository, IngredienteRepository ingredientRepository, IngredientRecipeRepository ingredientRecipeRepository) {
        this.recipeRepository = recipeRepository;
        this.ingredientRepository = ingredientRepository;
        this.ingredientRecipeRepository = ingredientRecipeRepository;
    }

    @Transactional
    public RecipeResponse createRecipe(RecipeRequestPost request) {
        Recipe r = mapRequestToEntity(request);
        // save recipe first to obtain id
        Recipe saved = recipeRepository.save(r);
        // persist ingredient relations (cantidad/unidades) if provided
        if (request.getIngredients() != null && !request.getIngredients().isEmpty()) {
            saveIngredientRelations(saved, request.getIngredients());
        }
        return mapToResponse(recipeRepository.findById(saved.getIdRecipe()).orElse(saved));
    }

    @Transactional(readOnly = true)
    public List<RecipeResponse> getAllRecipes() {
        return recipeRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public RecipeResponse getRecipeById(Long id) {
        Recipe r = recipeRepository.findById(id).orElseThrow(() -> new NotFoundException("Recipe not found with id: " + id));
        return mapToResponse(r);
    }

    @Transactional
    public RecipeResponse updateRecipe(Long id, RecipeRequestPost request) {
        Recipe existing = recipeRepository.findById(id).orElseThrow(() -> new NotFoundException("Recipe not found with id: " + id));
        existing.setName(request.getName());
        existing.setDescription(request.getDescription());
        existing.setPrepTime(request.getPrepTime());
        existing.setIdType(request.getTypeId());
        Recipe saved = recipeRepository.save(existing);
        // remove previous ingredient relations and save new ones
        ingredientRecipeRepository.deleteByRecipeId(saved.getIdRecipe());
        if (request.getIngredients() != null && !request.getIngredients().isEmpty()) {
            saveIngredientRelations(saved, request.getIngredients());
        }
        return mapToResponse(recipeRepository.findById(saved.getIdRecipe()).orElse(saved));
    }

    @Transactional
    public void deleteRecipe(Long id) {
        if (!recipeRepository.existsById(id)) {
            throw new NotFoundException("Recipe not found with id: " + id);
        }
        recipeRepository.deleteById(id);
    }

    private Recipe mapRequestToEntity(RecipeRequestPost r) {
        Recipe e = new Recipe();
        e.setName(r.getName());
        e.setDescription(r.getDescription());
        e.setPrepTime(r.getPrepTime());
        e.setIdType(r.getTypeId());
        return e;
    }

    private void saveIngredientRelations(Recipe recipe, java.util.List<RecipeRequestPost.IngredientQuantity> ingredients) {
        // validate ingredient ids and build map for quick lookup
        List<Long> ids = ingredients.stream().map(RecipeRequestPost.IngredientQuantity::getIngredientId).collect(Collectors.toList());
        List<Ingredient> found = ingredientRepository.findAllById(ids);
        if (found.size() != ids.size()) {
            throw new NotFoundException("One or more ingredients not found");
        }
        Map<Long, Ingredient> foundMap = found.stream().collect(Collectors.toMap(Ingredient::getId, i -> i));

        // update recipe.ingredients set for consistency (optional)
        recipe.setIngredients(new java.util.HashSet<>(found));
        recipeRepository.save(recipe);

        List<IngredientRecipe> relations = ingredients.stream().map(iq -> {
            Ingredient ing = foundMap.get(iq.getIngredientId());
            IngredientRecipe ir = new IngredientRecipe();
            ir.setRecipe(recipe);
            ir.setIngredient(ing);
            ir.setCantidad(iq.getQuantity());
            ir.setUnidades(iq.getUnits());
            return ir;
        }).collect(Collectors.toList());

        ingredientRecipeRepository.saveAll(relations);
    }

    private RecipeResponse mapToResponse(Recipe e) {
        RecipeResponse resp = new RecipeResponse();
        resp.setId(e.getIdRecipe());
        resp.setName(e.getName());
        resp.setDescription(e.getDescription());
        resp.setPrepTime(e.getPrepTime());
        resp.setTypeId(e.getIdType());
        if (e.getIngredients() != null && !e.getIngredients().isEmpty()) {
            resp.setIngredients(e.getIngredients().stream().map(i -> {
                IngredientInRecipeResponse ir = new IngredientInRecipeResponse();
                ir.setId(i.getId());
                ir.setName(i.getName());
                // fetch cantidad/unidades from join table
                try {
                    Double cantidad = ingredientRepository.findCantidadByRecipeIdAndIngredientId(e.getIdRecipe(), i.getId());
                    String unidades = ingredientRepository.findUnidadesByRecipeIdAndIngredientId(e.getIdRecipe(), i.getId());
                    ir.setCantidad(cantidad);
                    ir.setUnidades(unidades);
                } catch (Exception ex) {
                    // if query fails or no row, leave cantidad/unidades null
                }
                return ir;
            }).collect(Collectors.toList()));
        }
        return resp;
    }

}
