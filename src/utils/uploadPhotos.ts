import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Platform } from "react-native";
import { storage } from "../../config/firebase";

export const uploadPhotos = async (files: any[], progress: number, setprogress: (progress: number) => void) => {
  const urls: string[] = [];
  try {
    const promises = files.map(async (file) => {
      setprogress(0);

      const { uri } = file;
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      const response = await fetch(uploadUri);
      const blobFile = await response.blob();
      const reference = ref(storage, Date.now() + file?.fileName);
      const task = uploadBytesResumable(reference, blobFile);

      return new Promise<string>((resolve, reject) => {
        task.on('state_changed', (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setprogress(progress);
        }, reject, async () => {
          try {
            const url = await getDownloadURL(task.snapshot.ref);
            urls.push(url);
            resolve(url);
          } catch (error) {
            reject(error);
          }
        });
      });
    });

    await Promise.all(promises);
    return urls;
  } catch (error) {
    console.error(error);
    return [];
  }
};
