import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Swal from "sweetalert2";

const schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup.string().required("Password is required"),
});

const toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const SignInPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //   const { user } = useAuth();
  const handleSignIn = async (data) => {
    if (!isValid) return;
    const { email, password } = data;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
        className="w-full max-w-[600px] mx-auto mt-14 p-10 bg-white rounded-lg shadow text-black"
        aria-label="signup-form"
      >
        <h2 className="mb-10 text-3xl font-bold text-center">Sign In Form</h2>
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

        <div className="flex items-center justify-end mb-5 text-slate-400">
          <p>Already have an account?</p>
          <a href="#" className="text-blue-500 underline">
            Sign Up
          </a>
        </div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
        >
          Sign In
        </button>
        <div
          onClick={handleSignInWithGoogle}
          className="inline-flex items-center gap-2 justify-center px-5 mt-2 cursor-pointer py-3 font-sans font-semibold tracking-wide text-white bg-green-500 rounded-lg w-[100px]"
        >
          <span>
            <i className="fa-brands fa-google"></i>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
