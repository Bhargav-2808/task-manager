import axios from 'axios';

const cloudName = 'dfgdisd2p'
const HOST_URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
export const uploadfile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'my-upload');
  const result = await axios.post(HOST_URL, formData);
  return result?.data?.secure_url;
};
