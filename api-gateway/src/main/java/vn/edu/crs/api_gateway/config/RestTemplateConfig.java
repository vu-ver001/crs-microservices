// path: api-gateway/src/main/java/vn/edu/crs/apigateway/config/WebClientConfig.java
// purpose: khai bao bean RestTemplate de AuthServiceClient su dung (gateway dung WebMVC, khong dung WebFlux)
package vn.edu.crs.api_gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(2000);
        factory.setReadTimeout(2000);
        return new RestTemplate(factory);
    }
}
