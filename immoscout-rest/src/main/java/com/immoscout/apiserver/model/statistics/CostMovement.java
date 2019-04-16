package com.immoscout.apiserver.model.statistics;

import java.util.List;

public class CostMovement {
    private List<CostMovementList> movementList;

    public List<CostMovementList> getMovementList() {
        return movementList;
    }

    public void setMovementList(List<CostMovementList> movementList) {
        this.movementList = movementList;
    }
}
