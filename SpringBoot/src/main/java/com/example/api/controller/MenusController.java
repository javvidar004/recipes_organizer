package com.example.api.controller;

import java.time.LocalDate;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.api.dto.Requests.MenuRequest;
import com.example.api.dto.Responses.MenuResponse;
import com.example.api.dto.Responses.ShoppingItemResponse;
import com.example.api.service.MenuService;

@RestController
@RequestMapping("/api/menus")
public class MenusController {

    private final MenuService menuService;

    public MenusController(MenuService menuService) {
        this.menuService = menuService;
    }
    /*
    @PostMapping
    public ResponseEntity<MenuResponse> createMenu(@Valid @RequestBody MenuRequest request) {
        MenuResponse created = menuService.createMenu(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(created.getId()).toUri();
        return ResponseEntity.created(location).body(created);
    }
     */
    @GetMapping
    public ResponseEntity<List<MenuResponse>> getAllMenus() {
        List<MenuResponse> response = menuService.getAllMenus();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<MenuResponse> getMenu(@PathVariable Long userId, @Valid @RequestBody com.example.api.dto.Requests.MenuRequestGet request) {
        MenuResponse response = menuService.getMenuById(userId, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
        menuService.deleteMenu(id);
        return ResponseEntity.noContent().build();
    }

        @GetMapping("/{idUser}/shopping-list")
    public ResponseEntity<List<ShoppingItemResponse>> getShoppingList(
            @PathVariable Long idUser,
            @RequestParam(name = "start", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam(name = "end", required = true) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        List<ShoppingItemResponse> shoppingList = menuService.getShoppingList(idUser, start, end);
        return ResponseEntity.ok(shoppingList);
    }

    @PutMapping("/recipes/{userId}")
    public ResponseEntity<Void> upsertMenuRecipes(@PathVariable Long userId, @Valid @RequestBody MenuRequest request) {
        menuService.upsertMenuRecipes(userId, request);
        return ResponseEntity.ok().build();
    }

}
