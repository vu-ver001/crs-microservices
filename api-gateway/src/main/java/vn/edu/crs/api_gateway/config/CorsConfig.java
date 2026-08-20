// purpose: cau hinh CORS tap trung tai Gateway - noi duy nhat cua he thong cho phep
// cross-origin request tu frontend. Gateway su dung Spring Cloud Gateway Server WebMVC
// (khong phai WebFlux) nen khong doc block `spring.cloud.gateway.globalcors`,
// thay vao do ta dang ky mot CorsFilter (Servlet) chay TRUOC AuthHeaderFilter de
// xu ly OPTIONS preflight truoc khi bi chan thieu Authorization.
package vn.edu.crs.api_gateway.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    // doc tu application.yml (app.cors.allowed-origins) de giu tinh tap trung cau hinh
    @Value("${app.cors.allowed-origins}")
    private String[] allowedOrigins;

    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList(allowedOrigins));
        config.setAllowedMethods(Arrays.asList("*"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setMaxAge(3600L); // cache preflight 1h, giam so luong request OPTIONS

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
        // chay truoc AuthHeaderFilter (@Order(-1)) de OPTIONS preflight khong bi chan 401
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }
}