
import { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

export default function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const querySnapshot = await getDocs(collection(db, "lessonFiles"));
      const filesData = [];
      querySnapshot.forEach((doc) => {
        filesData.push(doc.data());
      });
      setFiles(filesData);
    };
    fetchFiles();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>الملفات المرفوعة من Firebase</h2>
      <ul>
        {files.map((file, i) => (
          <li key={i}>
            <a href={file.url} target="_blank" rel="noreferrer">{file.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
