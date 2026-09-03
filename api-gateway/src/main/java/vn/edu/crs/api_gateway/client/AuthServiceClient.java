// path: api-gateway/src/main/java/vn/edu/crs/apigateway/client/AuthServiceClient.java
// purpose: goi sang auth-service (endpoint noi bo) de kiem tra API Key.
// Vi api-gateway chay tren nen WebMVC (Servlet) nen dung RestTemplate blocking thay vi WebClient reactive.
// Nguyen tac fail-safe: neu khong ket noi duoc, coi nhu key khong hop le.
package vn.edu.crs.api_gateway.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Component
public class AuthServiceClient {

    private final RestTemplate restTemplate;
    private final String baseUrl;

    public AuthServiceClient(RestTemplate restTemplate,
                             @Value("${auth-service.base-url:http://localhost:8081}") String baseUrl) {
        this.restTemplate = restTemplate;
        this.baseUrl = baseUrl;
    }

    @SuppressWarnings("unchecked")
    public boolean isValidForScope(String key, String scope) {
        try {
            String url = UriComponentsBuilder.fromUriString(baseUrl)
                    .path("/internal/api-keys/validate")
                    .queryParam("key", key)
                    .queryParam("scope", scope)
                    .build()
                    .toUriString();
            Map<String, Object> res = restTemplate.getForObject(url, Map.class);
            if (res == null) return false;
            return Boolean.TRUE.equals(res.get("valid"));
        } catch (Exception e) {
            // fail-safe: neu auth-service khong ket noi duoc, coi nhu key khong hop le
            return false;
        }
    }
}
