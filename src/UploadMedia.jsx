import React, { useState } from 'react'; 
import { getCurrentUser } from 'aws-amplify/auth';
import { uploadData } from '@aws-amplify/storage'; // Import Gen 2 storage method


function UploadMedia() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccessMessage('');
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
    const user = await getCurrentUser();
    console.log('✅ Logged in as:', user.username);
  } catch (err) {
    console.log('⚠️ Not logged in:', err);
  }
    try {
      // Upload file using Amplify Gen 2 method
      const { key } = await uploadData({
        key: `gallery/${file.name}`,  // ✅ saves the file in S3 under the "gallery/" folder
        data: file,               // File object
        options: {
          accessLevel: 'public',  // So anyone can view (your gallery fetches public files)
          contentType: file.type, // Preserve MIME type (e.g., image/jpeg, video/mp4)
        },
      }).result;

      setSuccessMessage(`✅ Uploaded: ${key}`);
      setFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      alert('❌ Upload failed. See console for details.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <h3>Upload New Style</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default UploadMedia;
