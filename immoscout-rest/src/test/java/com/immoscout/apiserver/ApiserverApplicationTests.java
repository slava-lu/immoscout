package com.immoscout.apiserver;

import com.immoscout.apiserver.repository.ApartmentRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ApiserverApplicationTests {

    @Autowired
    private ApartmentRepository apartmentRepository;

    @Test
    public void contextLoads() {
        assertThat(apartmentRepository).isNotNull();
    }

}

