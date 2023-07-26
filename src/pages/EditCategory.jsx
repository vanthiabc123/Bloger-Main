import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import slugify from "slugify";
import * as yup from "yup";
import { db } from "../firebase/firebaseConfig";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const schema = yup.object().shape({
  category: yup.string().required("Category is required"),
});

const EditCategory = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { id } = useParams();
  const [category, setCategory] = useState({});

  const getData = async () => {
    const categoryRef = doc(db, "categories", id);
    await getDoc(categoryRef).then((doc) => {
      console.log(doc.data());
      setCategory(doc.data());
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleUploadCategory = async (data) => {
    if (!isValid) return;
    const { category } = data;
    const categoryRef = doc(db, "categories", id);
    try {
      await updateDoc(categoryRef, {
        category,
        slug: slugify(category),
      });
      console.log("Category updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen w-full">
      <h1>Add Category</h1>
      <form onSubmit={handleSubmit(handleUploadCategory)}>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-y-2 justify-center">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              {...register("category")}
              defaultValue={category.category}
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
              defaultValue={category.slug}
              placeholder="Enter your content"
              className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
            />
          </div>
        </div>
        <button className="inline-flex items-center mt-5 justify-center px-5 py-3 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg">
          Update Category
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
