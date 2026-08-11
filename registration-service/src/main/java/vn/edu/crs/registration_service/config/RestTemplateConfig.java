package vn.edu.crs.registration_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

// purpose: cau hinh RestTemplate dung JdkClientHttpRequestFactory (dua tren java.net.http.HttpClient)
// vi SimpleClientHttpRequestFactory mac dinh (dua tren HttpURLConnection) KHONG ho tro PATCH
@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate(new JdkClientHttpRequestFactory());
    }
}
