import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { auth, db } from "../firebase/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  rpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
});
const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const handleSignUp = async (data) => {
    if (!isValid) return;
    const { email, password } = data;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await addDoc(collection(db, "users"), {
        email,
        createdAt: serverTimestamp(),
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
        className="w-full max-w-[600px] mx-auto mt-14 p-10 bg-white rounded-lg shadow"
        aria-label="signup-form"
      >
        <h2 className="mb-10 text-3xl font-bold text-center">Sign Up Form</h2>
        <div className="flex flex-col items-start mb-5 gap-y-3">
          <label htmlFor="email" className="text-sm font-medium cursor-pointer">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
            placeholder="Enter your email address..."
          />
          {errors.email && (
            <span className="text-red-600 font-normal text-base">
              {errors.email.message}
            </span>
          )}
        </div>
        <div className="flex flex-col items-start mb-5 gap-y-3">
          <label
            htmlFor="password"
            className="text-sm font-medium cursor-pointer"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
            placeholder="Enter your password"
          />
          {errors.password && (
            <span className="text-red-600 font-normal text-base">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="flex flex-col items-start mb-5 gap-y-3">
          <label
            htmlFor="rpassword"
            className="text-sm font-medium cursor-pointer"
          >
            Confirm Password
          </label>
          <input
            id="rpassword"
            type="password"
            {...register("rpassword")}
            className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none"
            placeholder="Enter your confirm password"
          />
          {errors.rpassword && (
            <span className="text-red-600 font-normal text-base">
              {errors.rpassword.message}
            </span>
          )}
        </div>
        <button className="inline-flex items-center gap-2 justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-green-500 rounded-lg ">
          <span>
            <i className="fa-brands fa-google"></i>
          </span>
          <span>SignUp with Google</span>
        </button>

        <div className="flex items-center justify-end mb-5 text-slate-400">
          <p>Already have an account?</p>
          <a href="#" className="text-blue-500 underline">
            Sign In
          </a>
        </div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
        >
          Create an account
        </button>
      </form>
    </>
  );
};

export default SignUpPage;
