// path: crs-frontend/src/pages/MyRegistrationsPage.tsx
// purpose: trang "Mon hoc da dang ky" - lay danh sach dang ky roi tu ghep them ten mon hoc,
// cho phep huy dang ky
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { getMyRegistrations, cancelRegistration } from '../api/registrationApi';
import { getCourseById } from '../api/courseApi';
import { useToast } from '../hooks/useToast';
import Toast from '../components/Toast';
import type { Registration } from '../types/registration';
import type { Course } from '../types/course';
import type { ApiErrorResponse } from '../types/apiError';

interface RegistrationRow extends Registration {
  courseName: string;
}

export default function MyRegistrationsPage() {
  const [rows, setRows] = useState<RegistrationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<number | null>(null);
  const { toast, showToast, clearToast } = useToast();

  const loadData = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await getMyRegistrations();
      const activeRegistrations = res.data.filter((r) => r.trangThai === 'DA_DANG_KY');

      // Ghep ten mon hoc cho tung dong - goi song song bang Promise.all cho nhanh
      const enriched = await Promise.all(
        activeRegistrations.map(async (reg) => {
          try {
            const courseRes = await getCourseById(reg.courseId);
            return { ...reg, courseName: (courseRes.data as Course).tenMonHoc };
          } catch {
            // Neu khong lay duoc ten mon (vi du mon da bi Admin xoa), van hien dong nay
            // voi ten mac dinh, khong lam vo ca trang
            return { ...reg, courseName: `Môn học #${reg.courseId} (không tìm thấy thông tin)` };
          }
        })
      );

      setRows(enriched);
    } catch (err) {
      let message = 'Không tải được danh sách môn học đã đăng ký.';
      if (axios.isAxiosError<ApiErrorResponse>(err) && err.response?.data?.message) {
        message = err.response.data.message;
      }
      setLoadError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCancel = async (row: RegistrationRow) => {
    if (!window.confirm(`Bạn có chắc chắn muốn hủy đăng ký môn "${row.courseName}"?`)) return;
    setCancellingId(row.id);
    try {
      await cancelRegistration(row.id);
      showToast(`Đã hủy đăng ký môn "${row.courseName}"`, 'success');
      loadData(); // tai lai danh sach
    } catch (err) {
      let message = 'Hủy đăng ký không thành công.';
      if (axios.isAxiosError<ApiErrorResponse>(err) && err.response?.data?.message) {
        message = err.response.data.message;
      }
      showToast(message, 'error');
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Môn học đã đăng ký</h1>
        <p>Danh sách các học phần bạn đã đăng ký thành công trong kỳ</p>
      </div>

      <div className="card">
        {loading && (
          <div className="loading-container">
            <div className="spinner" />
            <p className="loading-text">Đang tải danh sách môn học đã đăng ký...</p>
          </div>
        )}

        {!loading && loadError && (
          <div className="error-container">
            <div className="error-icon">&#9888;</div>
            <p className="error-message">{loadError}</p>
            <button className="btn btn-primary" onClick={loadData}>
              &#8635; Thử lại
            </button>
          </div>
        )}

        {!loading && !loadError && rows.length === 0 && (
          <div className="empty-container">
            <div className="empty-icon">&#128218;</div>
            <p className="empty-title">Bạn chưa đăng ký môn học nào</p>
            <p className="empty-subtitle">Hãy chuyển sang mục Đăng ký học phần để chọn môn học.</p>
          </div>
        )}

        {!loading && !loadError && rows.length > 0 && (
          <table className="course-table">
            <thead>
              <tr>
                <th>Tên môn học</th>
                <th style={{ width: 220 }}>Ngày đăng ký</th>
                <th style={{ width: 140 }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td style={{ fontWeight: 500 }}>{row.courseName}</td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 13 }}>
                    {new Date(row.ngayDangKy).toLocaleString('vi-VN')}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      style={{
                        padding: '4px 12px',
                        fontSize: 13,
                        background: 'var(--error)',
                        borderColor: 'var(--error)',
                      }}
                      onClick={() => handleCancel(row)}
                      disabled={cancellingId === row.id}
                    >
                      {cancellingId === row.id ? 'Đang hủy...' : 'Hủy đăng ký'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="footer-info">CRS - Hệ thống quản lý đăng ký môn học</div>

      {toast && <Toast message={toast.message} type={toast.type} onClose={clearToast} />}
    </div>
  );
}
