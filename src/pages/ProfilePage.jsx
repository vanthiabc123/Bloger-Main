import React from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useFirebaseImage from "../hooks/useFirebaseImage";
import { useAuth } from "../contexts/authContext";

const schema = yup.object().shape({
  displayName: yup.string().required("Displayname is required"),
  email: yup.string().required("Email is required").email("Email is invalid"),
});
const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({});
  const toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
  });

  const { id } = useParams();

  const {
    handleSubmit,
    register,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // lấy dữ liệu của user trong db và set vào input
  useEffect(() => {
    const colRef = collection(db, "users");
    const queries = query(colRef, where("uid", "==", id));
    onSnapshot(queries, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setProfile(results[0]);
    });
  }, []);
  const { handleDeleteImage, handleSelectImage, image, progress } =
    useFirebaseImage(setValue, getValues);
  const handleUpdateProfile = async (data) => {
    const { displayName, description } = data;
    await updateProfile(user, {
      displayName,
      photoURL: image || profile?.photoURL,
    });
    await updateDoc(doc(db, "users", profile.id), {
      displayName,
      description,
      photoURL: image || profile?.photoURL,
    });
    toast.fire({
      icon: "success",
      title: "Update profile success",
    });
  };
  return (
    <div className="h-full overflow-hidden overflow-y-auto">
      <h1 className="text-black font-semibold text-3xl mb-5">Profile Page</h1>
      <form
        onSubmit={handleSubmit(handleUpdateProfile)}
        className="grid grid-cols-2 gap-5 text-black"
      >
        <div className="flex flex-col w-full gap-y-3">
          <label className="w-32 font-medium">Displayname</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("displayName")}
            defaultValue={profile?.displayName}
            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
          />
          {errors.displayName && (
            <p className="text-red-500">{errors.displayName?.message}</p>
          )}
        </div>
        <div className="flex flex-col w-full gap-y-3">
          <label className="w-32 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            defaultValue={profile?.email}
            className="w-full border border-slate-200 rounded-lg py-3 px-5 outline-none  bg-transparent"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email?.message}</p>
          )}
        </div>
        <div className="col-span-1 flex-col flex gap-y-2">
          <label className="w-32 font-medium">Avatar</label>
          <input
            type="file"
            name="image"
            {...register("image")}
            onChange={handleSelectImage}
          />
          <img
            className="rounded-full w-[50px] h-[50px] object-cover"
            src={profile?.photoURL}
            alt=""
          />
        </div>
        <div className="col-span-2 flex flex-col w-full gap-y-3">
          <label className="w-32">Description</label>
          <textarea
            {...register("description")}
            className="w-full border border-slate-200 rounded-lg py-3 px-5 h-[300px] outline-none  bg-transparent"
            defaultValue={profile?.description}
          />
        </div>
        <div className="col-span-2 flex justify-end">
          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
