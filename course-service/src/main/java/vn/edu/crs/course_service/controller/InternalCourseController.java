package vn.edu.crs.course_service.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import vn.edu.crs.course_service.dto.CourseDTO;
import vn.edu.crs.course_service.service.CourseService;

// purpose: controller rieng cho cac API noi bo, chi danh cho registration-service goi sang
// Tach rieng de de ap bao mat khac nhau o Buoi 4 (vi du chi cho phep IP noi bo)
@RestController
@RequestMapping("/internal/courses")
@RequiredArgsConstructor
public class InternalCourseController {

    private final CourseService courseService;

    // Giam 1 cho con lai khi registration-service dang ky thanh cong
    @PatchMapping("/{id}/reserve-seat")
    public CourseDTO reserveSeat(@PathVariable Long id) {
        return courseService.reserveSeat(id);
    }

    // Tang 1 cho con lai khi registration-service huy dang ky
    @PatchMapping("/{id}/release-seat")
    public CourseDTO releaseSeat(@PathVariable Long id) {
        return courseService.releaseSeat(id);
    }
}
