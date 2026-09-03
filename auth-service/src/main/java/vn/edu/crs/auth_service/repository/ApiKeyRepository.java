// path: auth-service/src/main/java/vn/edu/crs/auth_service/repository/ApiKeyRepository.java
// purpose: repository JPA cho ApiKey
package vn.edu.crs.auth_service.repository;

import vn.edu.crs.auth_service.entity.ApiKey;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ApiKeyRepository extends JpaRepository<ApiKey, Long> {
    Optional<ApiKey> findByKeyValue(String keyValue);
}
