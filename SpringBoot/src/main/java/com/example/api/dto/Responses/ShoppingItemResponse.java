package com.example.api.dto.Responses;

public class ShoppingItemResponse {

    private String name;
    private Double cantidad;
    private String unidades;

    public ShoppingItemResponse() {
    }

    public ShoppingItemResponse(String name, Double cantidad, String unidades) {
        this.name = name;
        this.cantidad = cantidad;
        this.unidades = unidades;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getCantidad() {
        return cantidad;
    }

    public void setCantidad(Double cantidad) {
        this.cantidad = cantidad;
    }

    public String getUnidades() {
        return unidades;
    }

    public void setUnidades(String unidades) {
        this.unidades = unidades;
    }
}
