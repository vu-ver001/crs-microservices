import { useState, useEffect } from 'react';
import type { Course, CourseFormValues } from '../types/course';
import { emptyCourseForm } from '../types/course';

interface CourseFormProps {
  editingCourse: Course | null; // null = đang ở chế độ Thêm; có giá trị = đang Sửa
  onSubmit: (values: CourseFormValues) => Promise<void>;
  onCancel: () => void;
  submitting: boolean;
  serverError: string | null;
}

export default function CourseForm({
  editingCourse,
  onSubmit,
  onCancel,
  submitting,
  serverError,
}: CourseFormProps) {
  const [values, setValues] = useState<CourseFormValues>(emptyCourseForm);
  const [clientErrors, setClientErrors] = useState<Partial<CourseFormValues>>({});

  // Mỗi lần editingCourse thay đổi (bấm nút Sửa trên 1 dòng khác), mồi lại dữ liệu vào form
  useEffect(() => {
    if (editingCourse) {
      setValues({
        tenMonHoc: editingCourse.tenMonHoc,
        soTinChi: String(editingCourse.soTinChi),
        soChoToiDa: String(editingCourse.soChoToiDa),
      });
    } else {
      setValues(emptyCourseForm);
    }
    setClientErrors({});
  }, [editingCourse]);

  const validate = (): boolean => {
    const errors: Partial<CourseFormValues> = {};

    if (!values.tenMonHoc.trim()) {
      errors.tenMonHoc = 'Tên môn học không được để trống';
    }

    const soTinChi = Number(values.soTinChi);
    if (!values.soTinChi || isNaN(soTinChi) || soTinChi <= 0) {
      errors.soTinChi = 'Số tín chỉ phải là số lớn hơn 0';
    }

    const soChoToiDa = Number(values.soChoToiDa);
    if (!values.soChoToiDa || isNaN(soChoToiDa) || soChoToiDa <= 0) {
      errors.soChoToiDa = 'Số chỗ tối đa phải là số lớn hơn 0';
    }

    setClientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ marginBottom: 20 }}>
      <h3 style={{ marginBottom: 16, fontSize: 18 }}>{editingCourse ? 'Sửa môn học' : 'Thêm môn học mới'}</h3>

      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 14, fontWeight: 600 }}>Tên môn học</label>
        <input
          type="text"
          className="search-input"
          style={{ marginTop: 4, paddingLeft: 14 }}
          value={values.tenMonHoc}
          onChange={(e) => setValues({ ...values, tenMonHoc: e.target.value })}
          placeholder="VD: Lập trình Java"
        />
        {clientErrors.tenMonHoc && <p style={{ color: 'var(--error)', fontSize: 13, marginTop: 4 }}>{clientErrors.tenMonHoc}</p>}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 14, fontWeight: 600 }}>Số tín chỉ</label>
        <input
          type="number"
          className="search-input"
          style={{ marginTop: 4, paddingLeft: 14 }}
          value={values.soTinChi}
          onChange={(e) => setValues({ ...values, soTinChi: e.target.value })}
          placeholder="VD: 3"
        />
        {clientErrors.soTinChi && <p style={{ color: 'var(--error)', fontSize: 13, marginTop: 4 }}>{clientErrors.soTinChi}</p>}
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 14, fontWeight: 600 }}>Số chỗ tối đa</label>
        <input
          type="number"
          className="search-input"
          style={{ marginTop: 4, paddingLeft: 14 }}
          value={values.soChoToiDa}
          onChange={(e) => setValues({ ...values, soChoToiDa: e.target.value })}
          placeholder="VD: 50"
        />
        {clientErrors.soChoToiDa && <p style={{ color: 'var(--error)', fontSize: 13, marginTop: 4 }}>{clientErrors.soChoToiDa}</p>}
      </div>

      {serverError && (
        <p style={{ color: 'var(--error)', background: 'var(--error-bg)', border: '1px solid var(--error-border)', padding: '8px 12px', borderRadius: 8, fontSize: 13, marginBottom: 12 }}>
          {serverError}
        </p>
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Đang lưu...' : editingCourse ? 'Cập nhật' : 'Thêm mới'}
        </button>
        {editingCourse && (
          <button type="button" className="btn btn-outline" onClick={onCancel}>
            Hủy
          </button>
        )}
      </div>
    </form>
  );
}
