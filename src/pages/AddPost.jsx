import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { db } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";
import slugify from "slugify";
const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  // slug: yup.string().required("Slug is required"),
});

const AddPost = () => {
  const [content, setContent] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagesUploaded, setImagesUploaded] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSubmitForm = async (data) => {
    if (!isValid) return;
    const { title, slug, image, featured, status, category } = data;
    const storageRef = ref(storage, `products/${image[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, image[0]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImagesUploaded(downloadURL);
          console.log(imagesUploaded);
        });
      }
    );
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        slug: slugify(slug || title, { lower: true }),
        image: imagesUploaded,
        featured,
        status,
        category,
        content,
        createdAt: serverTimestamp(),
      });
      toast.success("Add post successfully");
    } catch (error) {
      console.log(error);
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
          <input type="file" {...register("image")} />
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
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
