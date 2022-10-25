import Head from "next/head";
import { useState} from "react";
import logo from "../public/images/logo.png";
import Image from "next/image";
import Footer from "../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  console.log(success)

  const handleSubmit = async (e) => {
    
    try {
      e.preventDefault();
      const { data } = await axios.post(`/api/auth/forgot-password`, { email });
      setSuccess(data.message);
      toast.success(`Check Your Email`, { position: "top-center", theme: "colored", autoClose: 2000 });
      setEmail("");
    } catch (error) {
      console.log(error)
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      <Head>
        <title>forgot-Password</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="flex flex-col h-screen justify-between">
        <div className="flex justify-start p-4">
          <Image
            alt="profile pic"
            src={logo}
            className=""
            width={90}
            height={62}
            placeholder="blur"
            blurDataURL
          />
        </div>
        <div className="flex flex-col">
          <div className="conatiner mx-auto flex items-center">
            <div className="px-4 max-w-md sm:w-full space-y-8 text">
              <h2 className="text-center text-3xl font-extrabold text-gray-900">
                Forgot Password
              </h2>
              <span className="text-center text-sm font-normal">
                Please enter your email address.You will receive a link to
                create a new password.
              </span>

              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="rounded-md shadow-sm">
                  <div>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required=""
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <button className="rounded-lg bg-[#4092CF] text-base px-3 py-2 hover:bg-blue-400 transition duration-300">
                    Send Email
                  </button>
                  {error && <span className="text-red-500">{error}</span>}
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
