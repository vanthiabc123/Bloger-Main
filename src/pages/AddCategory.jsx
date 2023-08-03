import { db } from "../firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import slugify from "slugify";
import * as yup from "yup";
import { useAuth } from "../contexts/authContext";

const schema = yup.object().shape({
  category: yup.string().required("Category is required"),
});

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleAddCategory = async (data) => {
    if (!isValid) return;
    const { category, slug } = data;
    try {
      await addDoc(collection(db, "categories"), {
        category,
        slug: slugify(category),
        createdAt: serverTimestamp(),
      });
      console.log("Category added successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const { user } = useAuth();
  if (user.role !== "admin") return <h1>You are not admin</h1>;
  return (
    <div className="h-screen w-full">
      <h1>Add Category</h1>
      <form onSubmit={handleSubmit(handleAddCategory)}>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-y-2 justify-center">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              {...register("category")}
              placeholder="Enter your content"
              className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
            />
            {errors.category && (
              <p className="text-red-500">{errors.category.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-2 justify-center">
            <label htmlFor="slug">Slug</label>
            <input
              type="text"
              placeholder="Enter your content"
              className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
            />
          </div>
        </div>
        <button className="inline-flex items-center mt-5 justify-center px-5 py-3 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg">
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
