
import { useState } from 'react';
import { storage, db } from '../firebase-config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [status, setStatus] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUpload = async () => {
    if (!file || !studentName) return alert("اختر ملفًا وادخل اسم الطالب");
    setStatus("جاري الرفع...");

    const storageRef = ref(storage, `lessons/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      await addDoc(collection(db, "lessonFiles"), {
        name: file.name,
        student: studentName,
        url,
        uploadedAt: Timestamp.now()
      });

      setUploadedFiles(prev => [...prev, { name: file.name, student: studentName, url }]);
      setStatus("تم الرفع بنجاح!");
      setFile(null);
      setStudentName('');
    } catch (error) {
      console.error("خطأ في الرفع:", error);
      setStatus("حدث خطأ أثناء الرفع");
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>رفع ملفات الدروس</h2>
      <input type="text" placeholder="اسم الطالب" value={studentName} onChange={e => setStudentName(e.target.value)} />
      <br /><br />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>رفع</button>
      <p>{status}</p>
      <h3>الملفات المرفوعة:</h3>
      <ul>
        {uploadedFiles.map((f, i) => (
          <li key={i}><strong>{f.student}:</strong> <a href={f.url} target="_blank" rel="noreferrer">{f.name}</a></li>
        ))}
      </ul>
    </div>
  );
}
