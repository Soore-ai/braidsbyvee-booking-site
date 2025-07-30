import React, { useEffect, useState } from 'react';
import { list, getUrl } from '@aws-amplify/storage';

function Gallery() {
  const [mediaList, setMediaList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMediaFromS3();
  }, []);

 const fetchMediaFromS3 = async () => {
  try {
  const result = await list('gallery/', {
  accessLevel: 'public',
});




    const items = result.items || [];

    const urls = await Promise.all(
      items.map(async (item) => {
        const { url } = await getUrl({
          key: item.key,
          options: { accessLevel: 'public' },
        });

        return {
          key: item.key,
          url: url || '',
        };
      })
    );

    setMediaList(urls);
  } catch (error) {
    console.error('❌ Error loading media from S3:');
    console.log('Error name:', error.name);
    console.log('Error message:', error.message);
    console.log('Full error:', error);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="gallery">
      <h2>Style Gallery</h2>
      {loading && <p>Loading media...</p>}
      {!loading && mediaList.length === 0 && <p>No styles uploaded yet.</p>}

      <div className="gallery-grid">
        {mediaList.map((media) => {
          const isVideo = media.key.endsWith('.mp4') || media.key.endsWith('.mov');
          return isVideo ? (
            <video key={media.key} controls className="gallery-video">
              <source src={media.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img key={media.key} src={media.url} alt={media.key} className="gallery-img" />
          );
        })}
      </div>
    </div>
  );
}

export default Gallery;
