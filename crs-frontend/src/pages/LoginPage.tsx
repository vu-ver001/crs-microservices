// path: crs-frontend/src/pages/LoginPage.tsx
// purpose: trang dang nhap, goi POST /api/auth/login, luu vao AuthContext roi dieu huong
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login as loginApi } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import type { ApiErrorResponse } from '../types/apiError';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      const res = await loginApi({ username, password });
      login(res.data);
      navigate('/courses');
    } catch (err) {
      if (axios.isAxiosError<ApiErrorResponse>(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card card">
        <div className="login-header">
          <div className="login-logo">CRS</div>
          <h2>Đăng nhập Hệ thống</h2>
          <p>Nhập thông tin tài khoản để truy cập</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              id="username"
              type="text"
              className="search-input"
              style={{ paddingLeft: 14 }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="VD: admin, student1"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              className="search-input"
              style={{ paddingLeft: 14 }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu của bạn"
            />
          </div>

          {error && (
            <div className="form-error-alert">
              <span>&#9888; {error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary btn-submit"
            style={{ width: '100%', marginTop: 8 }}
          >
            {submitting ? 'Đang xác thực...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="login-footer">
          <p>Tài khoản mẫu: <code>admin / admin123</code> (Admin) hoặc <code>student1 / student123</code> (Sinh viên)</p>
        </div>
      </div>
    </div>
  );
}
