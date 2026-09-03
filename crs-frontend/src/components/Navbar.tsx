// path: crs-frontend/src/components/Navbar.tsx
// purpose: thanh dieu huong, hien thi menu khac nhau tuy theo trang thai dang nhap va role
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="navbar-logo">CRS</span>
          <span className="navbar-title">Hệ thống Đăng ký Môn học</span>
        </div>

        <nav className="navbar-links">
          <Link
            to="/courses"
            className={`navbar-link ${isActive('/courses') ? 'active' : ''}`}
          >
            Danh sách môn học
          </Link>
          {isAuthenticated && user?.role === 'ADMIN' && (
            <>
              <Link
                to="/admin/courses"
                className={`navbar-link ${isActive('/admin/courses') ? 'active' : ''}`}
              >
                Quản trị môn học
              </Link>
              <Link
                to="/admin/api-keys"
                className={`navbar-link ${isActive('/admin/api-keys') ? 'active' : ''}`}
              >
                Quản lý API Key
              </Link>
            </>
          )}
          {isAuthenticated && user?.role === 'STUDENT' && (
            <>
              <Link
                to="/register-course"
                className={`navbar-link ${isActive('/register-course') ? 'active' : ''}`}
              >
                Đăng ký học phần
              </Link>
              <Link
                to="/my-registrations"
                className={`navbar-link ${isActive('/my-registrations') ? 'active' : ''}`}
              >
                Môn học đã đăng ký
              </Link>
            </>
          )}
        </nav>

        <div className="navbar-auth">
          {isAuthenticated && user ? (
            <div className="navbar-user-info">
              <span className="user-greeting">
                Xin chào, <strong>{user.username}</strong>
              </span>
              <span className={`role-badge ${user.role === 'ADMIN' ? 'role-admin' : 'role-student'}`}>
                {user.role}
              </span>
              <button className="btn btn-outline btn-logout" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-login">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
