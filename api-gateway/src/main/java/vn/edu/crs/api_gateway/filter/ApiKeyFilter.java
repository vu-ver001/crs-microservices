// purpose: thay the ban Buoi 4 (so sanh 1 chuoi tinh) bang kiem tra dong qua auth-service,
// co cache de giam tai. Ap dung cho route /api/public/courses (co the mo rong them route khac)
package vn.edu.crs.api_gateway.filter;

import vn.edu.crs.api_gateway.cache.ApiKeyValidationCache;
import vn.edu.crs.api_gateway.client.AuthServiceClient;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Order(-2) // chay truoc AuthHeaderFilter cho chinh route nay
public class ApiKeyFilter extends OncePerRequestFilter {

    private final AuthServiceClient authServiceClient;
    private final ApiKeyValidationCache cache;

    // Map tu path sang scope can co - mo rong o day khi them route doi tac moi
    private static final String PARTNER_PATH = "/api/public/courses";
    private static final String REQUIRED_SCOPE = "courses:read";

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();

        if (!path.startsWith(PARTNER_PATH)) {
            filterChain.doFilter(request, response);
            return;
        }

        String apiKey = request.getHeader("X-API-KEY");
        if (apiKey == null || apiKey.isBlank()) {
            response.setStatus(HttpStatus.FORBIDDEN.value());
            return;
        }

        String cacheKey = apiKey + ":" + REQUIRED_SCOPE;
        Boolean cached = cache.get(cacheKey);
        if (cached != null) {
            // Co trong cache - khong can goi sang auth-service
            if (cached) {
                filterChain.doFilter(request, response);
            } else {
                response.setStatus(HttpStatus.FORBIDDEN.value());
            }
            return;
        }

        // Chua co trong cache - goi sang auth-service kiem tra, roi luu lai cache
        boolean valid = authServiceClient.isValidForScope(apiKey, REQUIRED_SCOPE);
        cache.put(cacheKey, valid);
        if (valid) {
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(HttpStatus.FORBIDDEN.value());
        }
    }
}
