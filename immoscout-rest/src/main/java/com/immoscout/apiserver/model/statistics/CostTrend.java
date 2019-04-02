package com.immoscout.apiserver.model.statistics;

import java.util.List;

public class CostTrend {
    private String room;
    private String region;
    private List<CostTrendList> costStat;

    public String getRoom() {
        return room;
    }

    public void setRoom(String room) {
        this.room = room;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public List<CostTrendList> getCostStat() {
        return costStat;
    }

    public void setCostStat(List<CostTrendList> costStat) {
        this.costStat = costStat;
    }
}
