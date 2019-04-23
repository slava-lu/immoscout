package com.immoscout.apiserver.model.statistics;

import java.util.List;
import java.util.Map;

public class CostMovement {
    private Map<Integer, List<CostMovementList>> movementMap;

    public Map<Integer, List<CostMovementList>> getMovementMap() {
        return movementMap;
    }

    public void setMovementMap(Map<Integer, List<CostMovementList>> movementMap) {
        this.movementMap = movementMap;
    }
}
