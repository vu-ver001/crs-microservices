// path: crs-frontend/src/pages/CoursesPage.tsx
// purpose: trang xem danh sach mon hoc cong khai, chuyen tu App.tsx cua Buoi 6 sang,
// KHONG co Form Them/Sua/Xoa (danh cho ca ADMIN va STUDENT xem)
import { useState } from 'react';
import { useCourses } from '../api/useCourses';
import SearchBox from '../components/SearchBox';
import CourseList from '../components/CourseList';
import Pagination from '../components/Pagination';

export default function CoursesPage() {
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);

  const { courses, totalPages, state, errorMessage, refetch } = useCourses(keyword, page);

  const handleSearch = (newKeyword: string) => {
    setKeyword(newKeyword);
    setPage(0);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>Danh sách môn học</h1>
        <p>Tra cứu danh sách môn học mở đăng ký trong học kỳ</p>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <SearchBox onSearch={handleSearch} />
      </div>

      <div className="card">
        <CourseList
          courses={courses}
          state={state}
          errorMessage={errorMessage}
          onRetry={refetch}
        />
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      <div className="footer-info">CRS - Hệ thống quản lý đăng ký môn học</div>
    </div>
  );
}
