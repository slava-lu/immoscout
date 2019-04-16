package com.immoscout.apiserver.repository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.immoscout.apiserver.model.meta.RegionTypes;
import com.immoscout.apiserver.model.meta.RoomTypes;
import com.immoscout.apiserver.model.statistics.CostMovementList;
import com.immoscout.apiserver.model.statistics.CostTrendList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.core.namedparam.SqlParameterSource;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ApartmentRepository {

    @Autowired
    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public List<RoomTypes> getRoomTypes() {
        return namedParameterJdbcTemplate.query("select count(id) as entries_count, rooms as room from apartments " + "group by rooms order by rooms", new BeanPropertyRowMapper<>(RoomTypes.class));
    }

    public List<RegionTypes> getRegionTypes() {
        return namedParameterJdbcTemplate.query("select count(id) as entries_count, region from apartments group by " + "region order by entries_count desc", new BeanPropertyRowMapper<>(RegionTypes.class));
    }

    public List<CostTrendList> getCostTrendList(String region, String room) {
        SqlParameterSource namedParameters = new MapSqlParameterSource("region", region).addValue("room", room);
        return namedParameterJdbcTemplate.query("select date, cast(avg(price/size) as UNSIGNED) as price_per_meter, " + "count(id) as entries_count" + " from apartments where rooms=:room and region=:region group by date " + "order by date", namedParameters, new BeanPropertyRowMapper<>(CostTrendList.class));
    }

    public List<CostMovementList> getCostMovementList() {

        List<CostMovementList> result = namedParameterJdbcTemplate.query("SELECT record_id, region, date, id, price, " +
                "rooms, ROUND(price/size) " + "AS price_per_meter FROM apartments WHERE id IN (SELECT id FROM " +
                "apartments WHERE region = 'MUC-15'  " + "GROUP BY id HAVING COUNT(record_id) > 1) ORDER BY id, date," +
                " record_id", new BeanPropertyRowMapper<>(CostMovementList.class));
        System.out.println("result " + result.get(0).getId());

        return result;
    }
}
