import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import logo from "../../public/images/logo.png";
import Image from "next/image";
import Footer from "../../components/Footer";
import axios from "axios";
import { toast } from "react-toastify";


export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter()
  const { tokenid } = router.query

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords Don't Match");
    }

    try {
      const { data } = await axios.post(`/api/auth/reset-password/${tokenid}`, { password });
      setSuccess(data.success);
      setPassword("");
      setConfirmPassword("");
      toast.success(`Password Reset Success`, { position: "top-center", theme: "colored", autoClose: 2000, });
    } catch (error) {
      setError(error.response.data.error);
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  useEffect(() => {
    const redirectPage = async () => {
      if (success) {
        router.push("/");
      }
    };
    redirectPage();
  }, [success, router]);

  return (
    <>
      <Head>
        <title>Reset-Password</title>
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
        <div className="flex flex-col items-center">
            <div className="w-80 space-y-8">
              <div className="flex flex-col items-center">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Reset Password
              </h2>
              <span className="text-sm font-normal">
                Enter you new password below.
              </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="rounded-md shadow-sm space-y-2">
                  <div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Enter new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <button className="rounded-lg bg-[#4092CF] text-base px-3 py-2 hover:bg-blue-400 transition duration-300">
                    Reset Password
                  </button>
                  {error && <span className="text-red-500">{error}</span>}
                </div>
              </form>
            </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
