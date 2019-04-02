package com.immoscout.apiserver.service;

import com.immoscout.apiserver.model.meta.MetaInfo;
import com.immoscout.apiserver.model.statistics.CostTrend;
import com.immoscout.apiserver.repository.ApartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApartmentService {

    @Autowired
    private ApartmentRepository apartmentRepository;

    public MetaInfo getMetaInfo() {
        MetaInfo metaInfo = new MetaInfo();
        metaInfo.setRegions(apartmentRepository.getRegionTypes());
        metaInfo.setRooms(apartmentRepository.getRoomTypes());
        return metaInfo;
    }

    public CostTrend getCostTrendList(String region, String room) {
        CostTrend costTrend = new CostTrend();
        costTrend.setCostStat(apartmentRepository.getCostTrendList(region, room));
        costTrend.setRegion(region);
        costTrend.setRoom(room);
        return costTrend;
    }
}
