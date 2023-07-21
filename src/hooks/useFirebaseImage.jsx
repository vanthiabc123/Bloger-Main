import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import Swal from "sweetalert2";

export default function useFirebaseImage(setValue, getValue) {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");

  const handleUploadImage = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `products/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImage(downloadURL);
        });
      }
    );
  };
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };

  const handleDeleteImage = async (image) => {
    const storage = getStorage();
    const storageRef = ref(storage, `products/${image}`);
    await deleteObject(storageRef);
    Swal.fire({
      icon: "success",
      title: "Delete image success",
      showConfirmButton: false,
      timer: 1500,
    });
    setImage("");
  };
  return {
    handleSelectImage,
    handleDeleteImage,
    image,
    progress,
  };
}
