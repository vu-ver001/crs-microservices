// purpose: DTO tra ve token va thong tin co ban sau khi dang nhap thanh cong
package vn.edu.crs.auth_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDTO {

    private Long userId;
    private String token;
    private String username;
    private String role;
}
