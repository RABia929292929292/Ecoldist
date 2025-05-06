
import { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function AdminDashboard() {
  const [studentsCount, setStudentsCount] = useState(0);
  const [files, setFiles] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchStats = async () => {
      const studentSnap = await getDocs(collection(db, "students"));
      setStudentsCount(studentSnap.size);

      const fileSnap = await getDocs(collection(db, "lessonFiles"));
      const fileList = [];
      fileSnap.forEach((d) => fileList.push({ ...d.data(), id: d.id }));
      setFiles(fileList);
    };
    fetchStats();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("هل أنت متأكد من حذف الملف؟")) return;
    await deleteDoc(doc(db, "lessonFiles", id));
    setFiles(files.filter(f => f.id !== id));
  };

  const filteredFiles = files.filter(f => {
    if (filter === 'all') return true;
    if (filter === 'pdf') return f.name.endsWith('.pdf');
    if (filter === 'audio') return f.name.match(/\.(mp3|wav|ogg)$/i);
    if (filter === 'video') return f.name.match(/\.(mp4|webm|avi)$/i);
    if (filter === 'image') return f.name.match(/\.(jpg|jpeg|png|gif)$/i);
    return true;
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h2>لوحة تحكم المدير</h2>
      <p>عدد الطلبة المسجلين: <strong>{studentsCount}</strong></p>
      <p>عدد الملفات المرفوعة: <strong>{files.length}</strong></p>
      <label>تصنيف حسب النوع:</label>
      <select onChange={(e) => setFilter(e.target.value)} style={{ margin: '0 1rem' }}>
        <option value="all">الكل</option>
        <option value="pdf">PDF</option>
        <option value="audio">صوت</option>
        <option value="video">فيديو</option>
        <option value="image">صورة</option>
      </select>
      <hr />
      <h3>قائمة الملفات</h3>
      <ul>
        {filteredFiles.map((file, i) => (
          <li key={i}>
            <a href={file.url} target="_blank" rel="noreferrer">{file.name}</a>
            <button onClick={() => handleDelete(file.id)} style={{ marginRight: '1rem' }}>حذف</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
