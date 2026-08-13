// purpose: global filter kiem tra su ton tai cua header Authorization cho cac route can dang nhap;
// day CHI la buoc chan som de tiet kiem tai cho service phia sau, KHONG thay the viec tung
// service tu xac thuc chu ky JWT (xem muc C)
package vn.edu.crs.api_gateway.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
@Order(-1) // chay som, truoc khi request duoc dinh tuyen di
public class AuthHeaderFilter extends OncePerRequestFilter {

    // Cac duong dan KHONG can Header Authorization
    private static final List<String> OPEN_PATHS = List.of(
            "/api/auth/login",
            "/api/public/courses"
    );

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();

        boolean isOpen = OPEN_PATHS.stream().anyMatch(path::startsWith);

        // GET /api/courses/** la public (xem mon hoc khong can dang nhap),
        // chi POST/PUT/DELETE moi can token
        boolean isPublicCourseRead = path.startsWith("/api/courses")
                && request.getMethod().equals("GET");

        if (isOpen || isPublicCourseRead) {
            filterChain.doFilter(request, response);
            return;
        }

        if (request.getHeader("Authorization") == null) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            return;
        }

        filterChain.doFilter(request, response);
    }
}
