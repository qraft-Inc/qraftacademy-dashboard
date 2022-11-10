import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import Image from "next/image";
import profile from "../../public/images/profile.png";

export default function ViewMarketingModal({ user, setViewModal }) {
  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <div className="relative border-gray-400 bg-[#eee8e4] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8">
              <div className="grid ">
                <button
                  className="justify-self-end"
                  onClick={() => {
                    setViewModal(false);
                  }}
                >
                  <AiFillCloseCircle size="2rem" className="text-black" />
                </button>
              </div>
              <div className="px-4 pb-4 sm:p-6 sm:pb-4">
                <span>
                  {user.image ? (
                    <Image
                      alt="profile pic"
                      src={user.image}
                      className="col-auto rounded-full w-32"
                      width="100"
                      height="100"
                      // blurDataURL
                    />
                  ) : (
                    <Image
                      alt="profile pic"
                      src={profile}
                      className="col-auto rounded-full w-32"
                      width="100"
                      height="100"
                      // blurDataURL
                    />
                  )}
                </span>
                <table className="table-auto border-collapse border-gray-400">
                  <tbody>
                    <tr className="bg-white">
                      <th className="p-1.5 border border-gray-400 w-6/12">
                        Email
                      </th>
                      <td className="p-1.5 border border-gray-400 ">
                        {user.email}
                      </td>
                    </tr>
                    <tr className="bg-[#eee8e4]">
                      <th className="p-1.5 border border-gray-400 w-6/12">
                        Full Name
                      </th>
                      <td className="p-1.5 border border-gray-400">
                        {user.user.fullname}
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <th className="p-1.5 border border-gray-400 w-6/12">
                        Phone Number
                      </th>
                      <td className="p-1.5 border border-gray-400">
                        {user.marketing.telephone}
                      </td>
                    </tr>

                    <tr className="bg-[#eee8e4]">
                      <th className="p-1.5 border border-gray-400 w-6/12">
                        Link your CV
                      </th>
                      <td className="p-1.5 border border-gray-400">
                        {user.marketing.cv}
                      </td>
                    </tr>

                    <tr className="bg-white">
                      <th className="p-1.5 border border-gray-400 w-6/12">
                        Link to your Cover Letter
                      </th>
                      <td className="p-1.5 border border-gray-400">
                        {user.marketing.letter}
                      </td>
                    </tr>
                    <tr className="bg-[#eee8e4]">
                      <th className="p-1.5 border border-gray-400 w-6/12">
                        Link to your LinkedIn
                      </th>
                      <td className="p-1.5 border border-gray-400">
                        {user.marketing.linkedin}
                      </td>
                    </tr>
                    <tr className=" bg-white">
                      <th className="p-1.5 border border-gray-400 w-6/12">
                        How did you learn about Qraft Academy. What inspired
                        /motivated you to apply for this program?
                      </th>
                      <td className="p-1.5 border border-gray-400">
                        {user.marketing.textarea1}
                      </td>
                    </tr>
                    <tr className=" bg-[#eee8e4]">
                      <th className="p-1.5 border border-gray-400 w-6/12">
                        What are your expectations from this program?
                      </th>
                      <td className="p-1.5 border border-gray-400">
                        {user.marketing.textarea2}
                      </td>
                    </tr>
                    <tr className=" bg-white">
                      <th className="p-1.5 border border-gray-400 w-6/12">
                        What are you working on currently? and How do you keep
                        your designing skills current?
                      </th>
                      <td className="p-1.5 border border-gray-400">
                        {user.marketing.textarea3}
                      </td>
                    </tr>
                    <tr className=" bg-[#eee8e4]">
                      <th className="p-1.5 border border-gray-400 w-6/12">
                        What are your favorite and least favorite design tools,
                        and why?
                      </th>
                      <td className="p-1.5 border border-gray-400">
                        {user.marketing.textarea4}
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <th className="p-1.5 border border-gray-400 w-6/12">
                        What is your most proud of achievement so far?
                      </th>
                      <td className="p-1.5 border border-gray-40">
                        {user.marketing.textarea5}
                      </td>
                    </tr>
                    <tr className=" bg-[#eee8e4]">
                      <th className="p-1.5 border border-gray-400 w-6/12">
                        What type of role best suits you?
                      </th>
                      <td className="p-1.5 border border-gray-400">
                        {user.role}
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <th className="p-1.5 border border-gray-400 w-6/12">
                        When was the last time you stood up for something that
                        you believed in? What was your motivation? How did it
                        turn out?
                      </th>
                      <td className="p-1.5 border border-gray-400 ">
                        {user.marketing.textarea6}
                      </td>
                    </tr>
                    <tr className=" bg-[#eee8e4]">
                      <th className="p-1.5 border border-gray-400 w-6/12">
                        Professionally, what’s your goal?
                      </th>
                      <td className="p-1.5 border border-gray-400">
                        {user.marketing.textarea7}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
