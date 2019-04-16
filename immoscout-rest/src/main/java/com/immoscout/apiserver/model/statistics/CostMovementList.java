package com.immoscout.apiserver.model.statistics;

import java.time.LocalDate;

public class CostMovementList {
    private int recordId;
    private String region;
    private LocalDate date;
    private int id;
    private int price;
    private String rooms;
    private int pricePerMeter;

    public int getRecordId() {
        return recordId;
    }

    public void setRecordId(int recordId) {
        this.recordId = recordId;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getRooms() {
        return rooms;
    }

    public void setRooms(String rooms) {
        this.rooms = rooms;
    }

    public int getPricePerMeter() {
        return pricePerMeter;
    }

    public void setPricePerMeter(int pricePerMeter) {
        this.pricePerMeter = pricePerMeter;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
