import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";
import slugify from "slugify";
import { doc, updateDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useFirebaseImage from "../hooks/useFirebaseImage";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  category: yup.string().required("Category is required"),
  status: yup.string().required("Status is required"),
});
const EditPost = () => {
  const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
  });
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const postRef = collection(db, "posts");
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
  const getPosts = async () => {
    const querySnapshot = await getDocs(postRef);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const post = data.find((post) => post.id === id);
    setPost(post);
    setContent(post.content);
  };
  useEffect(() => {
    getPosts();
  }, []);

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

  const { handleSelectImage, handleDeleteImage, image, progress } =
    useFirebaseImage(setValue, getValues);
  const handleUpdatePost = async (data) => {
    if (!isValid) return;
    try {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        title: data.title,
        slug: slugify(data.slug || data.title, { lower: true }),
        image: image || post.image,
        featured: data.featured,
        status: data.status,
        category: data.category,
        content: content,
      });
      toast.fire({
        icon: "success",
        title: "Update post successfully",
      });
    } catch (error) {
      console.log(error);
      toast.fire({
        icon: "error",
        title: "Update post failed",
      });
    }
  };
  return (
    <div className="h-screen overflow-y-auto">
      <h3>Edit Post</h3>
      <form
        onSubmit={handleSubmit(handleUpdatePost)}
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
            defaultValue={post.title}
            className="border w-full border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
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
            {...register("slug")}
            placeholder="Enter your content"
            defaultValue={post.slug}
            className="border w-full border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {" "}
            Images
          </label>
          <input
            type="file"
            name="image"
            {...register("image")}
            onChange={handleSelectImage}
          />
          <img
            src={post.image}
            className="w-[50px] h-[50px] object-cover"
            alt=""
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <select {...register("category")}>
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
            {" "}
            Featured{" "}
          </label>
          <input type="checkbox" {...register("featured")} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Status
          </label>
          <select {...register("status")} className="">
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Content
          </label>
          <ReactQuill
            modules={modules}
            theme="snow"
            className="w-full"
            value={content}
            {...register("content")}
            onChange={setContent}
          />
        </div>
        <div className="mb-4 col-span-2">
          <button type="submit" className="btn-active btn btn-info ">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
