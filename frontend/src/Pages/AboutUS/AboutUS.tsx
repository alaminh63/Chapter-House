import { useTitle } from "../../component/hook/useTitle";

const AboutUS = () => {
  useTitle("About Us");
  // const { data, isLoading } = useGetAllAboutQuery(undefined);
  // const about = data?.data[0]?.data;
  // console.log("data: ", about);

  // if (isLoading) {
  //   return <LoadingPage />;
  // }
  return (
    // <div className="bg-purple-50 min-h-screen flex items-center justify-center">
    //   <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
    //     {/* Header Section */}
    //     <div className="bg-purple-600 text-white text-center py-12">
    //       <h1 className="text-4xl font-extrabold">
    //         Welcome to Boundless Reads Book Shop
    //       </h1>
    //       <p className="mt-4 text-lg">Where every book opens a new horizon</p>
    //     </div>

    //     {/* Content Section */}
    //     <div className="px-6 py-8">
    //       <h2 className="text-2xl font-semibold text-purple-700 mb-4">
    //         Our Journey
    //       </h2>
    //       <p className="text-lg text-gray-700">
    //         Our journey began with the boundless imagination of readers and the
    //         limitless potential of knowledge. "Boundless Reads" is not just a
    //         bookshop; it's a place where each book unveils a new world. Our goal
    //         is to create a platform for readers of all ages and tastes, where
    //         books and knowledge come together to enrich life.
    //       </p>

    //       {/* Specialties Section */}
    //       <div className="mt-8">
    //         <h3 className="text-xl font-semibold text-purple-700">
    //           Our Specialties
    //         </h3>
    //         <ul className="list-disc ml-6 text-gray-700">
    //           <li className="mt-2">
    //             A vast collection of books: From classic literature to
    //             contemporary bestsellers, we have something for everyone.
    //           </li>
    //           <li className="mt-2">
    //             Warm Hospitality: We believe a great book needs a comfortable
    //             environment. You'll find peace and comfort in every corner of
    //             our shop.
    //           </li>
    //           <li className="mt-2">
    //             Online and Offline Convenience: You can buy books from our
    //             online platform or visit us to browse through the pages in
    //             person.
    //           </li>
    //         </ul>
    //       </div>

    //       {/* Why Choose Us Section */}
    //       <div className="mt-8">
    //         <h3 className="text-xl font-semibold text-purple-700">
    //           Why Choose Us?
    //         </h3>
    //         <ul className="list-disc ml-6 text-gray-700">
    //           <li className="mt-2">
    //             Best Value: We provide high-quality books at affordable prices.
    //           </li>
    //           <li className="mt-2">
    //             Personalized Recommendations: Our experienced staff are always
    //             ready to suggest books tailored to your preferences.
    //           </li>
    //           <li className="mt-2">
    //             Support for Local Authors: We feature books written by local
    //             talents to encourage and promote their work.
    //           </li>
    //         </ul>
    //       </div>

    //       {/* Mission Section */}
    //       <div className="mt-8">
    //         <h3 className="text-xl font-semibold text-purple-700">
    //           Our Mission
    //         </h3>
    //         <p className="text-lg text-gray-700">
    //           To connect people through books and create a new world filled with
    //           knowledge, imagination, and creativity. We believe that every book
    //           can light a lamp in the heart of a reader.
    //         </p>
    //       </div>

    //       {/* Join Us Section */}
    //       <div className="mt-8">
    //         <h3 className="text-xl font-semibold text-purple-700">Join Us</h3>
    //         <p className="text-lg text-gray-700">
    //           Visit our store to find your favorite books or stay updated on our
    //           new collections. We are waiting for you!
    //         </p>
    //       </div>

    //       {/* Contact Section */}
    //       <div className="mt-8 bg-purple-100 py-4 text-center rounded-lg">
    //         <p className="text-lg text-purple-800">Address: Khulna</p>
    //         <p className="text-lg text-purple-800">
    //           Email:{" "}
    //           <a
    //             href="mailto:suvrodeb.cse@gmail.com"
    //             className="text-purple-600"
    //           >
    //             suvrodeb.cse@gmail.com
    //           </a>
    //         </p>
    //         <p className="text-lg text-purple-800">
    //           Website:{" "}
    //           <a
    //             href="https://suvrodeb.netlify.app/"
    //             className="text-purple-600"
    //           >
    //             suvrodeb.netlify.app
    //           </a>
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="bg-gradient-to-b  min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Header Section */}

        <div className="bg-purple-600 text-white text-center py-12">
          <h1 className="text-4xl font-extrabold">
            Welcome to Boundless Reads Book Shop
          </h1>
          <p className="mt-4 text-lg">Where every book opens a new horizon</p>
        </div>

        {/* Content Section */}
        <div className="px-8 py-12">
          <h2 className="text-3xl font-semibold text-purple-700 mb-6">
            Our Journey
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Our journey began with the boundless imagination of readers and the
            limitless potential of knowledge. "Boundless Reads" is not just a
            bookshop; it's a place where each book unveils a new world. Our goal
            is to create a platform for readers of all ages and tastes, where
            books and knowledge come together to enrich life.
          </p>

          {/* Specialties Section */}
          <div className="mt-8 bg-purple-50 p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-purple-700 mb-4">
              Our Specialties
            </h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>
                A vast collection of books: From classic literature to
                contemporary bestsellers, we have something for everyone.
              </li>
              <li>
                Warm Hospitality: We believe a great book needs a comfortable
                environment. You'll find peace and comfort in every corner of
                our shop.
              </li>
              <li>
                Online and Offline Convenience: You can buy books from our
                online platform or visit us to browse through the pages in
                person.
              </li>
            </ul>
          </div>

          {/* Why Choose Us Section */}
          <div className="mt-8 bg-purple-50 p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-purple-700 mb-4">
              Why Choose Us?
            </h3>
            <ul className="list-disc ml-6 text-gray-700 space-y-2">
              <li>
                Best Value: We provide high-quality books at affordable prices.
              </li>
              <li>
                Personalized Recommendations: Our experienced staff are always
                ready to suggest books tailored to your preferences.
              </li>
              <li>
                Support for Local Authors: We feature books written by local
                talents to encourage and promote their work.
              </li>
            </ul>
          </div>

          {/* Mission Section */}
          <div className="mt-8 bg-purple-50 p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-purple-700 mb-4">
              Our Mission
            </h3>
            <p className="text-lg text-gray-700">
              To connect people through books and create a new world filled with
              knowledge, imagination, and creativity. We believe that every book
              can light a lamp in the heart of a reader.
            </p>
          </div>

          {/* Join Us Section */}
          <div className="mt-8 bg-purple-50 p-6 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-purple-700 mb-4">
              Join Us
            </h3>
            <p className="text-lg text-gray-700 mb-6">
              Visit our store to find your favorite books or stay updated on our
              new collections. We are waiting for you!
            </p>
            <div className="text-center">
              <a
                href="/"
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition transform hover:scale-105 hover:bg-gradient-to-l duration-300"
              >
                Go to Home
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-8 bg-purple-100 py-4 text-center rounded-lg shadow-md">
            <p className="text-lg text-purple-800">Address: Khulna</p>
            <p className="text-lg text-purple-800">
              Email:{" "}
              <a
                href="mailto:suvrodeb.cse@gmail.com"
                className="text-purple-600 hover:text-purple-800"
              >
                suvrodeb.cse@gmail.com
              </a>
            </p>
            <p className="text-lg text-purple-800">
              Website:{" "}
              <a
                href="https://suvrodeb.netlify.app/"
                className="text-purple-600 hover:text-purple-800"
              >
                suvrodeb.netlify.app
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
