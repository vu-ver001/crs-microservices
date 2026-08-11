package vn.edu.crs.registration_service.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

// purpose: DTO nhan du lieu dau vao khi sinh vien dang ky hoc phan
@Data
public class RegistrationRequestDTO {

    @NotNull(message = "studentId khong duoc de trong")
    private Long studentId;

    @NotNull(message = "courseId khong duoc de trong")
    private Long courseId;
}
