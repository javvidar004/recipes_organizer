package com.example.api.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.api.dto.Requests.IngredientRequest;
import com.example.api.dto.Responses.IngredientResponse;
import com.example.api.entity.Ingredient;
import com.example.api.exception.NotFoundException;
import com.example.api.repository.IngredienteRepository;

@Service
public class IngredientService {

    private final IngredienteRepository ingredientRepository;

    public IngredientService(IngredienteRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    @Transactional
    public IngredientResponse createIngredient(IngredientRequest request) {
        Ingredient i = new Ingredient();
        i.setName(request.getName());
        i.setCalories(request.getCalories());
        i.setCost(request.getCost());
        Ingredient saved = ingredientRepository.save(i);
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<IngredientResponse> getAllIngredients() {
        return ingredientRepository.findAll().stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public IngredientResponse getIngredientById(Long id) {
        Ingredient i = ingredientRepository.findById(id).orElseThrow(() -> new NotFoundException("Ingredient not found with id: " + id));
        return mapToResponse(i);
    }

    @Transactional
    public IngredientResponse updateIngredient(Long id, IngredientRequest request) {
        Ingredient existing = ingredientRepository.findById(id).orElseThrow(() -> new NotFoundException("Ingredient not found with id: " + id));
        existing.setName(request.getName());
        existing.setCalories(request.getCalories());
        existing.setCost(request.getCost());
        Ingredient saved = ingredientRepository.save(existing);
        return mapToResponse(saved);
    }

    @Transactional
    public void deleteIngredient(Long id) {
        if (!ingredientRepository.existsById(id)) {
            throw new NotFoundException("Ingredient not found with id: " + id);
        }
        ingredientRepository.deleteById(id);
    }

    private IngredientResponse mapToResponse(Ingredient i) {
        IngredientResponse r = new IngredientResponse();
        r.setId(i.getId());
        r.setName(i.getName());
        r.setCalories(i.getCalories());
        r.setCost(i.getCost());
        return r;
    }

}
