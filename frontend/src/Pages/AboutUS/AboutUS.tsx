import { useTitle } from "../../component/hook/useTitle";

const AboutUS = () => {
  useTitle("About Us");

  return (
    <div className="bg-gray-900 min-h-screen text-gray-100">
      {/* Header Section */}
      <header className="bg-gradient-to-br from-indigo-900 to-indigo-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight animate-fade-in-up">
            Boundless Reads Book Shop
          </h1>
          <p className="mt-4 text-lg md:text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
            Discover a world where every book sparks imagination and knowledge.
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
        {/* Journey Section */}
        <section className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-800 rounded-2xl p-10 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-3xl font-semibold text-gray-100 mb-4">Our Journey</h2>
            <p className="text-base text-gray-300 leading-relaxed">
              Founded with a passion for storytelling, Boundless Reads is a sanctuary for readers. We connect people of all ages with books that inspire, educate, and entertain, fostering a community where knowledge thrives.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="bg-indigo-900 rounded-2xl h-full flex items-center justify-center p-10 text-gray-300 text-lg italic font-medium">
              “A book is a dream you hold in your hands.”
            </div>
          </div>
        </section>

        {/* Specialties Section */}
        <section className="bg-gray-800 rounded-2xl p-10 shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-gray-100 mb-8">What We Offer</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: "Diverse Collection",
                description: "From timeless classics to modern bestsellers, our curated selection caters to every reader.",
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ),
                title: "Welcoming Space",
                description: "A cozy, inviting atmosphere designed to make every visit memorable.",
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
                title: "Seamless Access",
                description: "Shop online with ease or visit our store to explore books in person.",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">{item.icon}</div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-100">{item.title}</h4>
                  <p className="text-base text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="bg-gray-800 rounded-2xl p-10 shadow-md hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-2xl font-semibold text-gray-100 mb-8">Why Choose Us?</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Affordable Quality",
                description: "Premium books at prices that make reading accessible to all.",
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                ),
                title: "Tailored Suggestions",
                description: "Our expert staff help you find the perfect book for any occasion.",
              },
              {
                icon: (
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                ),
                title: "Local Talent",
                description: "We champion local authors, showcasing their stories to the world.",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">{item.icon}</div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-100">{item.title}</h4>
                  <p className="text-base text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="text-center bg-gradient-to-r from-indigo-900 to-indigo-950 rounded-2xl p-12 shadow-md">
          <h3 className="text-3xl font-semibold text-gray-100 mb-4">Our Mission</h3>
          <p className="text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
            To foster a global community of readers by connecting people through the power of books, sparking creativity, and illuminating minds with knowledge.
          </p>
        </section>

        {/* Join Us Section */}
        <section className="text-center">
          <h3 className="text-3xl font-semibold text-gray-100 mb-4">Join Our Community</h3>
          <p className="text-base text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Explore our collection in-store or online, and stay connected for the latest arrivals and exclusive events.
          </p>
          <a
            href="/"
            className="inline-block bg-indigo-500 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:bg-indigo-600 transition duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label="Visit Home Page"
          >
            Visit Home
          </a>
        </section>

        {/* Contact Section */}
       
      </main>
    </div>
  );
};

export default AboutUS;