// path: crs-frontend/src/components/CourseList.tsx
// purpose: bo sung prop onRegister (tuy chon) va registeringId cho trang Dang ky hoc phan
import type { Course } from '../types/course';
import type { LoadState } from '../api/useCourses';

interface CourseListProps {
  courses: Course[];
  state: LoadState;
  errorMessage: string;
  onRetry: () => void;
  onEdit?: (course: Course) => void;
  onDelete?: (course: Course) => void;
  onRegister?: (course: Course) => void;
  registeringId?: number | null;
}

function getSeatsClass(soChoConLai: number, soChoToiDa: number): string {
  if (soChoConLai === 0) return 'seats-full';
  if (soChoConLai <= soChoToiDa * 0.2) return 'seats-low';
  return 'seats-available';
}

function getSeatsLabel(soChoConLai: number, soChoToiDa: number): string {
  return `${soChoConLai} / ${soChoToiDa}`;
}

export default function CourseList({
  courses,
  state,
  errorMessage,
  onRetry,
  onEdit,
  onDelete,
  onRegister,
  registeringId,
}: CourseListProps) {
  if (state === 'loading') {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p className="loading-text">Đang tải danh sách môn học...</p>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="error-container">
        <div className="error-icon">&#9888;</div>
        <p className="error-message">{errorMessage}</p>
        <button className="btn btn-primary" onClick={onRetry}>
          &#8635; Thử lại
        </button>
      </div>
    );
  }

  if (state === 'empty') {
    return (
      <div className="empty-container">
        <div className="empty-icon">&#128270;</div>
        <p className="empty-title">Không tìm thấy môn học nào phù hợp</p>
        <p className="empty-subtitle">Thử tìm kiếm với từ khóa khác</p>
      </div>
    );
  }

  const showActions = !!onEdit || !!onDelete || !!onRegister;

  return (
    <table className="course-table">
      <thead>
        <tr>
          <th>Tên môn học</th>
          <th style={{ width: 100 }}>Tín chỉ</th>
          <th style={{ width: 140 }}>Số chỗ còn lại</th>
          {showActions && <th style={{ width: 160 }}>Thao tác</th>}
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <tr key={course.id}>
            <td style={{ fontWeight: 500 }}>{course.tenMonHoc}</td>
            <td>{course.soTinChi}</td>
            <td>
              <span className={`seats-badge ${getSeatsClass(course.soChoConLai, course.soChoToiDa)}`}>
                {getSeatsLabel(course.soChoConLai, course.soChoToiDa)}
              </span>
            </td>
            {showActions && (
              <td>
                {onEdit && (
                  <button
                    className="btn btn-outline"
                    style={{ padding: '4px 12px', fontSize: 13 }}
                    onClick={() => onEdit(course)}
                  >
                    Sửa
                  </button>
                )}
                {onDelete && (
                  <button
                    className="btn btn-primary"
                    style={{
                      marginLeft: 8,
                      padding: '4px 12px',
                      fontSize: 13,
                      background: 'var(--error)',
                      borderColor: 'var(--error)',
                    }}
                    onClick={() => onDelete(course)}
                  >
                    Xóa
                  </button>
                )}
                {onRegister && (
                  <button
                    className={`btn ${course.soChoConLai === 0 ? 'btn-outline' : 'btn-primary'}`}
                    style={{ padding: '4px 14px', fontSize: 13 }}
                    onClick={() => onRegister(course)}
                    disabled={course.soChoConLai === 0 || registeringId === course.id}
                  >
                    {registeringId === course.id
                      ? 'Đang xử lý...'
                      : course.soChoConLai === 0
                      ? 'Hết chỗ'
                      : 'Đăng ký'}
                  </button>
                )}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
