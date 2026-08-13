// purpose: DTO tra ve token va thong tin co ban sau khi dang nhap thanh cong
package vn.edu.crs.auth_service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDTO {

    private String token;
    private String username;
    private String role;
}
