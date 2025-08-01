import React from 'react';

function ServiceCard({ title, description, file, alt }) {
  const isVideo = file.endsWith('.mp4') || file.endsWith('.mov');

  return (
    <div className="service-card">
      {isVideo ? (
        <video
          src={file}
          controls
          width="100%"
          style={{ borderRadius: '10px' }}
        />
      ) : (
        <img
          src={file}
          alt={alt}
          style={{ width: '100%', borderRadius: '10px' }}
        />
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default ServiceCard;
