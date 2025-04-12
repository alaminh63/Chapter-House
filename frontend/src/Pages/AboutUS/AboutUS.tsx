import { useTitle } from "../../component/hook/useTitle";

const AboutUS = () => {
  useTitle("About Us");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507842214779-492ca8c2cd3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80"
            alt="Bookshelf"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-50"
          />
        </div>
        <div className="container mx-auto relative z-10 px-4">
          <h1 className="text-5xl font-bold text-center mb-6">Our Story</h1>
          <p className="text-xl text-gray-200 text-center leading-relaxed max-w-3xl mx-auto">
            Boundless Reads is more than just a bookstore; it's a sanctuary for book lovers, a haven for curious minds,
            and a community where stories come alive.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Community */}
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-2xl font-semibold mb-3">Community</h3>
              <p className="text-gray-700 leading-relaxed">
                We foster a welcoming and inclusive space where readers, authors, and thinkers can connect, share ideas,
                and celebrate the joy of reading.
              </p>
            </div>

            {/* Discovery */}
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-2xl font-semibold mb-3">Discovery</h3>
              <p className="text-gray-700 leading-relaxed">
                We curate a diverse collection of books from around the world, encouraging exploration, intellectual
                curiosity, and a lifelong pursuit of knowledge.
              </p>
            </div>

            {/* Passion */}
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-2xl font-semibold mb-3">Passion</h3>
              <p className="text-gray-700 leading-relaxed">
                We are driven by an unwavering passion for books, literature, and the transformative power of storytelling.
                We strive to inspire that same passion in others.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
                alt="Bookstore Interior"
                className="rounded-lg shadow-md"
              />
            </div>

            {/* Text Content */}
            <div>
              <h2 className="text-3xl font-semibold mb-4">Our Journey</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                From our humble beginnings as a small, family-owned shop, Boundless Reads has grown into a beloved community
                hub. We've always been driven by a simple mission: to connect people with the books they'll cherish for a
                lifetime.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-4">
                Today, we're proud to offer a curated collection of classic and contemporary literature, along with a warm,
                welcoming atmosphere where everyone feels at home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1570295999919-56ce0e1f85e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-center shadow-md"
              />
              <h3 className="text-xl font-semibold">Jane Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654908?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-center shadow-md"
              />
              <h3 className="text-xl font-semibold">John Smith</h3>
              <p className="text-gray-600">Head of Marketing</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-center shadow-md"
              />
              <h3 className="text-xl font-semibold">Emily Brown</h3>
              <p className="text-gray-600">Lead Curator</p>
            </div>

            {/* Team Member 4 */}
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1531427186511-c25a5a6144ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt="Team Member"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-center shadow-md"
              />
              <h3 className="text-xl font-semibold">David Lee</h3>
              <p className="text-gray-600">Customer Relations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-6">Connect With Us</h2>
          <p className="text-gray-700 mb-2">Address: Khulna, Bangladesh</p>
          <p className="text-gray-700 mb-2">
            Email:
            <a href="mailto:suvrodeb.cse@gmail.com" className="text-blue-600 hover:text-blue-700 transition duration-200 ml-1">
              suvrodeb.cse@gmail.com
            </a>
          </p>
          <p className="text-gray-700">
            Website:
            <a href="https://suvrodeb.netlify.app/" className="text-blue-600 hover:text-blue-700 transition duration-200 ml-1">
              suvrodeb.netlify.app
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUS;