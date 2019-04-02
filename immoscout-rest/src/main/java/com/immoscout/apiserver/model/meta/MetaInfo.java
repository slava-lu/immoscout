package com.immoscout.apiserver.model.meta;

import java.util.List;

public class MetaInfo {
    private List<RegionTypes> regions;
    private List<RoomTypes> rooms;

    public List<RegionTypes> getRegions() {
        return regions;
    }

    public void setRegions(List<RegionTypes> regions) {
        this.regions = regions;
    }

    public List<RoomTypes> getRooms() {
        return rooms;
    }

    public void setRooms(List<RoomTypes> rooms) {
        this.rooms = rooms;
    }
}
