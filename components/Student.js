import Image from "next/image";
import profile from "../public/images/profile.png";
import { signOut, useSession } from "next-auth/react";
import { AiTwotoneVideoCamera } from "react-icons/ai";
import { RiArrowDropDownFill } from "react-icons/ri";
import logo from "../public/images/logo.png";
import Footer from "./Footer";

// learning modules
const cards = [
  {
    id: 1,
    cardImg:
      "https://res.cloudinary.com/filipe256/image/upload/v1659683132/qraftstore/HTML___CSS_pofmbo.jpg",
    alt: "HTML and CSS",
    cardTitle: "HTML and CSS",
    cardDesc: "Static Websites",
    width: "1600",
    height: "900",
  },
  {
    id: 2,
    cardImg:
      "https://res.cloudinary.com/filipe256/image/upload/v1659683112/qraftstore/721lt9kj92i3ov2cthfc_skvj59.png",
    alt: "Git And GitHub",
    cardTitle: "Git And GitHub",
    cardDesc: "Static Websites",
    width: "1000",
    height: "420",
  },
  {
    id: 3,
    cardImg:
      "https://res.cloudinary.com/filipe256/image/upload/v1659690636/qraftstore/javascript-logo_wb7c9w.jpg",
    alt: "JavaScript",
    cardTitle: "JavaScript",
    cardDesc: "Problem Solving And Programming Concepts",
    width: "450",
    height: "253",
  },
  {
    id: 4,
    cardImg:
      "https://res.cloudinary.com/filipe256/image/upload/v1659690512/qraftstore/react_rlzy45.jpg",
    alt: "Reactjs",
    cardTitle: "Reactjs",
    cardDesc: "Single Page Applications",
    width: "800",
    height: "533",
  },
  {
    id: 5,
    cardImg:
      "https://res.cloudinary.com/filipe256/image/upload/v1659690452/qraftstore/ia4qy1oh5cnjx7ovbc1o_alaqpe.png",
    alt: "Nextjs",
    cardTitle: "Nextjs",
    cardDesc: "JAM Stack",
    width: "1600",
    height: "900",
  },
  {
    id: 6,
    cardImg:
      "https://res.cloudinary.com/filipe256/image/upload/v1659683112/qraftstore/721lt9kj92i3ov2cthfc_skvj59.png",
    alt: "Git And GitHub",
    cardTitle: "Git And GitHub",
    cardDesc: "Static Websites",
    width: "1000",
    height: "420",
  },
  {
    id: 7,
    cardImg:
      "https://res.cloudinary.com/filipe256/image/upload/v1659690636/qraftstore/javascript-logo_wb7c9w.jpg",
    alt: "JavaScript",
    cardTitle: "JavaScript",
    cardDesc: "Problem Solving And Programming Concepts",
    width: "450",
    height: "253",
  },
  {
    id: 8,
    cardImg:
      "https://res.cloudinary.com/filipe256/image/upload/v1659690512/qraftstore/react_rlzy45.jpg",
    alt: "Reactjs",
    cardTitle: "Reactjs",
    cardDesc: "Single Page Applications",
    width: "800",
    height: "533",
  },
  {
    id: 9,
    cardImg:
      "https://res.cloudinary.com/filipe256/image/upload/v1659690452/qraftstore/ia4qy1oh5cnjx7ovbc1o_alaqpe.png",
    alt: "Nextjs",
    cardTitle: "Nextjs",
    cardDesc: "JAM Stack",
    width: "1600",
    height: "900",
  },
];
export default function Student() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col h-screen justify-between bg-[#eee8e4]">
      <div className="bg-[#eee8e4]">
        {/* header section */}
        <nav className="w-full flex items-center justify-between py-2 bg-gray-900 text-gray-200 navbar navbar-expand-lg">
          <div className="container-fluid w-full flex items-center justify-around md:justify-between lg:px-6">
            <div className="w-16 h-12">
              <Image
                alt="profile pic"
                src={logo}
                className="rounded-lg"
                width={90}
                height={62}
                placeholder="blur"
                blurDataURL
              />
            </div>

            <div className="flex items-center gap-1 text-base font-semibold">
              <span className="">Welcome</span>
              <span className="block text-[#f0ad4e]">
                {session.user.fullname}
              </span>
            </div>
            <div>
              <div>
                <div className="dropdown relative">
                  <button
                    className="flex items-center dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {session.user.image ? (
                      <div className="w-10 h-10">
                        <Image
                          alt="profile pic"
                          src={session.user.image}
                          className="inline object-cover mr-2 rounded-full"
                          width={3077}
                          height={3448}
                          placeholder="blur"
                          blurDataURL
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10">
                        <Image
                          alt="profile pic"
                          src={profile}
                          className="inline object-cover mr-2 rounded-full"
                          width={1010}
                          height={1010}
                          placeholder="blur"
                          blurDataURL
                        />
                      </div>
                    )}
                    <RiArrowDropDownFill size="1.2rem" className="text-white" />
                  </button>
                  <ul
                    className="dropdown-menu min-w-max absolute hidden bg-white text-base z-50 float-left py-2 list-none text-left rounded-lg
          shadow-lg mt-1 hidden m-0 bg-clip-padding border-none"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          signOut();
                        }}
                        className="dropdown-item text-xs leading-tight uppercase py-1 px-1 font-semibold block w-full bg-transparent text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* card section */}
        <section className="bg-red-400 lg:container lg:mx-auto mt-4 shadow-xl rounded-lg mb-8">
          <h1 className="lg:p-2 text-center w-full bg-[#4484B5] rounded-t-lg text-white font-bold text-base lg:text-lg">
            Learning Modules
          </h1>

          <div className="p-4 bg-gray-200 grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {cards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <a
                  href="#!"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  className="block"
                >
                  <Image
                    alt={card.alt}
                    src={card.cardImg}
                    className="w-full h-32 sm:h-48"
                    objectFit="cover"
                    width={card.width}
                    height={card.height}
                    placeholder="blur"
                    blurDataURL
                  />
                </a>
                <div className="p-2">
                  <h5 className="text-gray-900 text-base font-semibold mb-1">
                    {card.cardTitle}
                    <AiTwotoneVideoCamera
                      size="1.2rem"
                      className="text-[#f0ad4e] inline ml-1"
                    />
                  </h5>
                  <p className="text-gray-700 text-sm">{card.cardDesc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
