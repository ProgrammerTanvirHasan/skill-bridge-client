export default function Display() {
  return (
    <div className="bg-[#093B3B] min-h-[800px] flex flex-col lg:flex-row justify-between p-8">
      <div className="flex flex-col justify-center text-white max-w-xl space-y-6 mb-8 lg:mb-0">
        <h2 className="text-xl tracking-widest">S K I L L B R I D G E</h2>
        <h1 className="text-6xl font-extrabold leading-tight">
          Connect with Expert Tutors, <br /> Learn Anything
        </h1>
        <p className="text-lg leading-relaxed">
          Browse tutors by subject, book sessions instantly, and grow your skills
          with personalized one-on-one learning.
        </p>

        <div>
          <input
            type="text"
            placeholder="Search by subject or tutor..."
            className="w-full rounded-md px-4 py-3 text-gray-800 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#136E61]"
          />
        </div>
      </div>

      <div className="flex items-center justify-center lg:justify-start ">
        <img
          src="/teach.jpg"
          alt="Education illustration"
          className="w-96 h-96 object-cover rounded-full bg-green-600 "
        />
      </div>
    </div>
  );
}
