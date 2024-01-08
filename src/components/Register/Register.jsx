import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdErrorOutline } from "react-icons/md";
import Lottie from "lottie-react";
import registerLottie from "/public/registerLottie.json";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUser(data?.email, data?.password).then((userCredential) => {
      updateUserProfile(data?.name, data?.photoURL)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
      userCredential.user.displayName = data?.name;
      userCredential.user.photoURL = data?.photoURL;
    });
  };

  return (
    <>
      <div className="bg-gray-100 flex h-full items-center pb-16">
        <div className="w-full max-w-6xl mx-auto p-6 flex items-center ">
          <div className="mt-7 w-full md:w-1/2 bg-white border border-gray-200 rounded-xl shadow-sm ">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl md:text-4xl font-bold text-gray-800">
                  Register Now!
                </h1>
              </div>

              <div className="mt-5 sm:mt-6">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Name*
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register("name", { required: "Name is required." })}
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none border"
                      />
                      <p>
                        {errors.name && (
                          <span className="text-red-600 text-xs flex items-center gap-0.5">
                            <MdErrorOutline />
                            {errors.name?.message}
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="photoURL"
                        className="block text-sm font-medium mb-2"
                      >
                        Photo URL*
                      </label>
                      <input
                        type="text"
                        id="photoURL"
                        {...register("photoURL", {
                          required: "Photo URL is required.",
                        })}
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none border"
                      />
                      <p>
                        {errors.photoURL && (
                          <span className="text-red-600 text-xs flex items-center gap-0.5">
                            <MdErrorOutline />
                            {errors.photoURL?.message}
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email address*
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register("email", {
                          required: "Email is required.",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Invalid email format.",
                          },
                        })}
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none border"
                      />
                      <p>
                        {errors.email && (
                          <span className="text-red-600 text-xs flex items-center gap-0.5">
                            <MdErrorOutline />
                            {errors.email?.message}
                          </span>
                        )}
                      </p>
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium mb-2"
                      >
                        Password*
                      </label>
                      <input
                        type="password"
                        id="password"
                        {...register("password", {
                          required: "Password is required.",
                          minLength: {
                            value: 6,
                            message:
                              "Password should have at least 6 characters.",
                          },
                          maxLength: {
                            value: 32,
                            message:
                              "Password should contain less than 32 characters.",
                          },
                          pattern: {
                            value: /[A-Z]/,
                            message:
                              "Password should have at least one capital letter.",
                          },
                        })}
                        className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-cyan-500 focus:ring-cyan-500 disabled:opacity-50 disabled:pointer-events-none border"
                      />
                      <p>
                        {errors.password && (
                          <span className="text-red-600 text-xs flex items-center gap-0.5">
                            <MdErrorOutline />
                            {errors.password?.message}
                          </span>
                        )}
                      </p>
                    </div>

                    <div>
                      <div className="flex gap-1.5 pb-1">
                        <input
                          id="toc"
                          {...register("toc", {
                            required: "Please accept our terms and conditions.",
                          })}
                          type="checkbox"
                          className="shrink-0 mt-0.5 border-gray-200 rounded text-cyan-600  focus:ring-cyan-500"
                        />
                        <label htmlFor="toc" className="text-sm font-medium">
                          I accept the{" "}
                          <Link
                            className="text-cyan-600 decoration-2 hover:underline font-medium"
                            to=""
                          >
                            Terms and Conditions
                          </Link>
                        </label>
                      </div>
                      <p>
                        {errors.toc && (
                          <span className="text-red-600 text-xs flex items-center gap-0.5">
                            <MdErrorOutline />
                            {errors.toc?.message}
                          </span>
                        )}
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-cyan-600 text-white hover:bg-cyan-800 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Register
                    </button>
                  </div>
                </form>
                <p className="mt-2 text-sm text-gray-600">
                  Already have an account?
                  <Link
                    className="text-cyan-600 decoration-2 hover:underline font-medium "
                    to="/login"
                  >
                    Log in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <Lottie animationData={registerLottie} loop={false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
