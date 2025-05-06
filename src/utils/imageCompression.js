import imageCompression from 'browser-image-compression';

export async function compressImage(imageFile) {
  const options = {
    maxSizeMB: 1, // Max file size in MB
    maxWidthOrHeight: 800, // Max width/height
    useWebWorker: true, // Use web worker for better performance
    fileType: 'image/jpeg' // Output format
  };

  try {
    const compressedFile = await imageCompression(imageFile, options);
    return compressedFile;
  } catch (error) {
    console.error('Error compressing image:', error);
    return imageFile; // Return original file if compression fails
  }
}