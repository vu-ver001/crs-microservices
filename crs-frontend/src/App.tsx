import { useState } from 'react';
import { useCourses } from './api/useCourses';
import SearchBox from './components/SearchBox';
import CourseList from './components/CourseList';
import Pagination from './components/Pagination';

function App() {
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
        <h1>Danh sach mon hoc</h1>
        <p>Tim kiem va dang ky mon hoc cho hoc ky nay</p>
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

      <div className="footer-info">
        CRS - He thong quan ly dang ky mon hoc
      </div>
    </div>
  );
}

export default App;
