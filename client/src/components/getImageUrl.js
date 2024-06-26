const getImageUrl = (imagePath) => {
  const serverBaseUrl = 'http://localhost:3001';
  const clientBaseUrl = 'http://localhost:3000';

  if (imagePath.startsWith('/server-assets')) {
    return `${serverBaseUrl}${imagePath}`;
  } else {
    return `${clientBaseUrl}${imagePath}`;
  }
};

export default getImageUrl;