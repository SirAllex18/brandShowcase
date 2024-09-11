const getImageUrl = (imagePath) => {
  const serverBaseUrl = 'https://brandshowcaseserver.vercel.app'; 
  const clientBaseUrl = 'https://brand-showcase-gray.vercel.app'; 
  if (imagePath.startsWith('/server-assets')) {
    return `${serverBaseUrl}${imagePath}`; 
  } else {
    return `${clientBaseUrl}${imagePath}`; 
  }
};

export default getImageUrl;
