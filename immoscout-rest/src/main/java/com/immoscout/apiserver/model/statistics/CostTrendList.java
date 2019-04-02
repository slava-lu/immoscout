package com.immoscout.apiserver.model.statistics;

import java.time.LocalDate;

public class CostTrendList {
    private LocalDate date;
    private int pricePerMeter;
    private int entriesCount;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getPricePerMeter() {
        return pricePerMeter;
    }

    public void setPricePerMeter(int pricePerMeter) {
        this.pricePerMeter = pricePerMeter;
    }

    public int getEntriesCount() {
        return entriesCount;
    }

    public void setEntriesCount(int entriesCount) {
        this.entriesCount = entriesCount;
    }
}
