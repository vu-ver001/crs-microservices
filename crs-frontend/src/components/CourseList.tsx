import type { Course } from '../types/course';
import type { LoadState } from '../api/useCourses';

interface CourseListProps {
  courses: Course[];
  state: LoadState;
  errorMessage: string;
  onRetry: () => void;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
}

function getSeatsClass(soChoConLai: number, soChoToiDa: number): string {
  if (soChoConLai === 0) return 'seats-full';
  if (soChoConLai <= soChoToiDa * 0.2) return 'seats-low';
  return 'seats-available';
}

function getSeatsLabel(soChoConLai: number, soChoToiDa: number): string {
  return `${soChoConLai} / ${soChoToiDa}`;
}

export default function CourseList({ courses, state, errorMessage, onRetry, onEdit, onDelete }: CourseListProps) {
  if (state === 'loading') {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p className="loading-text">Dang tai danh sach mon hoc...</p>
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className="error-container">
        <div className="error-icon">&#9888;</div>
        <p className="error-message">{errorMessage}</p>
        <button className="btn btn-primary" onClick={onRetry}>
          &#8635; Thu lai
        </button>
      </div>
    );
  }

  if (state === 'empty') {
    return (
      <div className="empty-container">
        <div className="empty-icon">&#128270;</div>
        <p className="empty-title">Khong tim thay mon hoc nao phu hop</p>
        <p className="empty-subtitle">Thu tim kiem voi tu khoa khac</p>
      </div>
    );
  }

  return (
    <table className="course-table">
      <thead>
        <tr>
          <th>Tên môn học</th>
          <th style={{ width: 100 }}>Tín chỉ</th>
          <th style={{ width: 140 }}>Số chỗ còn lại</th>
          <th style={{ width: 160 }}>Thao tác</th>
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
            <td>
              <button className="btn btn-outline" style={{ padding: '4px 12px', fontSize: 13 }} onClick={() => onEdit(course)}>
                Sửa
              </button>
              <button
                className="btn btn-primary"
                style={{ marginLeft: 8, padding: '4px 12px', fontSize: 13, background: 'var(--error)', borderColor: 'var(--error)' }}
                onClick={() => onDelete(course)}
              >
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
