import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Footer from "./Footer";
import logo from "../public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


export default function Signin() {
  const router = useRouter();
  const { data: session } = useSession();

  // initial form value
  const initialValues = {
    email: "",
    password: "",
  };

  const [error, setError] = useState(null);

  // form validation with yup Lib
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });


  useEffect(() => {
    if (session?.user) {
      router.push("/dashboard");
    }
  }, [router, session]);

  const onSubmit = async (values, onSubmitProps) => {
    const result = await signIn("credentials", {
      redirect: false,
      email:values.email,
      password:values.password,
    });

    // onSubmitProps.resetForm();
    if (result?.error) {
      setError(result.error);
      // setTimeout(() => {
      //   setError("");
      // }, 5000);
    }


  };

  return (
    <div className="flex flex-col h-screen justify-between">
      <div className="flex justify-start p-4 ">
        <Link href="https://qraft-academy.netlify.app">
          <a>
            <Image
              alt="profile pic"
              src={logo}
              className=""
              width={90}
              height={62}
              placeholder="blur"
              blurDataURL
            />
          </a>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="conatiner mx-auto flex items-center">
          <div className="max-w-md w-full space-y-8">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              className="w-full"
            >
              <Form>
                {/* <form onSubmit={handleSubmit} className="space-y-2"> */}
                <div className="rounded-md shadow-sm space-y-2">
                  <div>
                    <Field
                      name="email"
                      type="email"
                      aria-label="email"
                      autoComplete="email"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                    <div className="font-bold text-red-600 text-sm">
                      <ErrorMessage name="email" />
                    </div>

                    {/* <input
                    name="email"
                    type="email"
                    aria-label="email"
                    autoComplete="email"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  /> */}
                  </div>

                  <div>
                    <Field
                      name="password"
                      type="password"
                      aria-label="password"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                    <div className="font-bold text-red-600 text-sm">
                      <ErrorMessage name="password" />
                    </div>

                    {/* <input
                    name="password"
                    type="password"
                    aria-label="password"
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  /> */}
                  </div>
                </div>
                <div className="flex flex-col">
                  <button
                    type="submit"
                    className="rounded-lg bg-[#4092CF] text-base px-3 py-2 hover:bg-blue-400 transition duration-300"
                  >
                    Login
                  </button>
                  <Link href="/forgot-password" passHref>
                    <a className="text-blue-500 text-sm text-right">
                      Forgot Password ?
                    </a>
                  </Link>
                  {error && (
                    <span className="text-red-500 text-center">{error}</span>
                  )}
                </div>
                {/* </form> */}
              </Form>
            </Formik>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
