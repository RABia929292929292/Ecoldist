
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function AdminPanel() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('students') || '[]');
    setStudents(saved);
  }, []);

  const deleteStudent = (name) => {
    if (!window.confirm("هل أنت متأكد من حذف الطالب؟")) return;
    const updated = students.filter(s => s !== name);
    setStudents(updated);
    localStorage.setItem('students', JSON.stringify(updated));
    const allRecords = JSON.parse(localStorage.getItem('records') || '{}');
    delete allRecords[name];
    localStorage.setItem('records', JSON.stringify(allRecords));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>لوحة تحكم الأستاذ</h2>
      <table border="1" cellPadding="5">
        <thead><tr><th>#</th><th>الاسم</th><th>الصفحة</th><th>دردشة</th><th>حذف</th></tr></thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>{s}</td>
              <td><Link to={`/student/${s}`}>عرض</Link></td>
              <td><Link to={`/private-chat/${s}`}>دردشة</Link></td>
              <td><button onClick={() => deleteStudent(s)}>حذف</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
