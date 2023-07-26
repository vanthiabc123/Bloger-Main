import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { db } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";

import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import slugify from "slugify";
import { useAuth } from "../contexts/authContext";
import useFirebaseImage from "../hooks/useFirebaseImage";
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
});

const AddPost = () => {
  const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
  });
  const [content, setContent] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  // const [imagesUploaded, setImagesUploaded] = useState("");
  const [categories, setCategories] = useState([]);
  // const [image, setImage] = useState([]);
  const [userId, setUserId] = useState({
    id: "",
    email: "",
  });
  const { user } = useAuth();
  useEffect(() => {
    async function FetchUserData() {
      const q = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUserId({
          id: doc.id,
          email: doc.data().email,
          displayName: doc.data().displayName,
        });
      });
    }
    FetchUserData();
  }, [user.email]);
  useEffect(() => {
    async function getData() {
      const q = query(collection(db, "categories"));
      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(results);
    }
    getData();
  }, []);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { handleDeleteImage, handleSelectImage, image, progress } =
    useFirebaseImage(setValue, getValues);
  const handleSubmitForm = async (data) => {
    console.log(data);
    if (!isValid) return;
    const { title, slug, featured, status, category } = data;
    try {
      await addDoc(collection(db, "posts"), {
        title,
        slug: slugify(slug || title, { lower: true }),
        image: image,
        featured,
        status,
        category,
        content,
        userId: userId?.id,
        author: userId?.displayName,
        createdAt: serverTimestamp(),
      });
      toast.fire({
        icon: "success",
        title: "Add post successfully",
      });
    } catch (error) {
      console.log(error);
      toast.fire({
        icon: "error",
        title: "Add post failed",
      });
    }
  };
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
          { align: [] },
        ],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image", "video"],
      ],
    }),
    []
  );
  return (
    <div>
      <h3>Add Post</h3>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="grid grid-cols-2 gap-5"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter your content"
            {...register("title")}
            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Slug
          </label>
          <input
            type="text"
            placeholder="Enter your content"
            {...register("slug")}
            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
          />
          {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Images
          </label>
          <input
            type="file"
            name="image"
            {...register("image")}
            onChange={handleSelectImage}
          />
          {uploadProgress > 0 && <progress value={uploadProgress} max="100" />}
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select
            {...register("category")}
            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.category}>
                {category.category}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Featured
          </label>
          <input type="checkbox" {...register("featured")} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Status
          </label>
          <select
            {...register("status")}
            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
          >
            <option value="1">Active</option>
            <option value="2">Inactive</option>
          </select>
        </div>
        <div className="mb-4 col-span-2">
          <div className="w-full  entry-content">
            <ReactQuill
              modules={modules}
              theme="snow"
              value={content}
              {...register("content")}
              onChange={(value) => setContent(value)}
              defaultValue=""
            />
          </div>
        </div>
        <div className="mb-4 col-span-2">
          <button type="submit" className="btn-active btn btn-info ">
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
