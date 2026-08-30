package vn.edu.crs.registration_service.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import vn.edu.crs.registration_service.dto.RegistrationRequestDTO;
import vn.edu.crs.registration_service.entity.Registration;
import vn.edu.crs.registration_service.service.RegistrationService;

import java.util.List;

// purpose: controller cho dang ky/huy dang ky hoc phan
@RestController
@RequestMapping("/registrations")
@RequiredArgsConstructor
public class RegistrationController {

    private final RegistrationService registrationService;

    @GetMapping("/my")
    public List<Registration> getMyRegistrations(Authentication authentication) {
        Long studentId = (Long) authentication.getCredentials();
        return registrationService.getMyRegistrations(studentId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Registration register(@Valid @RequestBody RegistrationRequestDTO dto) {
        return registrationService.register(dto);
    }

    @DeleteMapping("/{id}")
    public void cancel(@PathVariable Long id) {
        registrationService.cancel(id);
    }
}
