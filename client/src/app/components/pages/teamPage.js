"use client";

import Footer from "../Footer";

const teamMembers = [
  {
    name: "Sofia Lane",
    role: "Lead Hair Stylist",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    bio: "Sofia specializes in modern cuts and balayage. With over 10 years in the industry, her creativity turns hair into art.",
  },
  {
    name: "Ava Kim",
    role: "Senior Makeup Artist",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Ava is known for flawless bridal looks and editorial makeup. She brings out the natural beauty in every client.",
  },
  {
    name: "Lena Cruz",
    role: "Nail Technician",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    bio: "Lena’s precision and artistic flair make her a nail design queen. From minimal to glam, she does it all.",
  },
  {
    name: "Zara Ali",
    role: "Skin Care Specialist",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    bio: "Zara offers personalized skin treatments with a holistic touch. Her facials are client favorites.",
  },
  {
    name: "Emily Stone",
    role: "Senior Lash Technician",
    image: "https://randomuser.me/api/portraits/women/66.jpg",
    bio: "Emily has perfected lash extensions for 7+ years and customizes every set for a natural glam look.",
  },
  {
    name: "Chloe Patel",
    role: "Aesthetic Nurse",
    image: "https://randomuser.me/api/portraits/women/70.jpg",
    bio: "Chloe specializes in non-surgical facial enhancements and skincare rejuvenation treatments.",
  },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-pink-50 text-gray-800">
      <div className="max-w-7xl mx-auto text-center py-16 px-4">
        <h2 className="text-5xl font-bold text-pink-600 mb-6 font-handwritten">
          Meet Our Lovely Team
        </h2>
        <p className="mb-12 text-lg text-gray-600">
          Passionate beauty professionals dedicated to making you feel radiant and confident.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl p-6 text-center transition duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-28 h-28 mx-auto rounded-full object-cover mb-5 border-4 border-pink-300"
              />
              <h3 className="text-2xl font-semibold text-pink-700">{member.name}</h3>
              <p className="text-pink-500 font-medium">{member.role}</p>
              <p className="text-sm text-gray-500 mt-3">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
