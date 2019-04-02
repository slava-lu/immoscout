package com.immoscout.apiserver.controller;

import com.immoscout.apiserver.model.meta.MetaInfo;
import com.immoscout.apiserver.model.statistics.CostTrend;
import com.immoscout.apiserver.service.ApartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@CrossOrigin
@RestController
public class ApartmentController {

    @Autowired
    private ApartmentService apartmentService;

    @RequestMapping("/meta")
    public Mono<MetaInfo> getMetaInfo() {
        return Mono.justOrEmpty(apartmentService.getMetaInfo());
    }

    @RequestMapping("/cost-trend")
    public Mono<CostTrend> getCostTrend(@RequestParam String region, @RequestParam String room) {
        return Mono.justOrEmpty(apartmentService.getCostTrendList(region, room));
    }
}
