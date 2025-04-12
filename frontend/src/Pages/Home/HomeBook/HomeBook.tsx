import React from 'react';
 
import LoadingPage from '../../../component/LoadingPage/LoadingPage';
import { useGetHomeBookQuery } from '../../../Redux/api/features/Book/bookManagementApi';
import { TBook } from '../../../utils/Types/GlobalType';
import BookContent from './BookContent';
import SectionTitle from '../../SharedPage/SectionTitle/SectionTitle';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const HomeBook = () => {
  const { data, isLoading } = useGetHomeBookQuery(undefined);
  const books = data?.data;

  if (isLoading) {
    return <LoadingPage />;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeInOut' } },
  };

  return (
    <div className="py-16 bg-gray-50"> {/* Padded section, subtle background */}
      <div className="container mx-auto px-4"> {/* Centered container */}
        <SectionTitle
          subHeading="Discover Our Latest Gems"
          heading="Featured Books"
        />

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"  // Adjusted column counts
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {books?.map((data: TBook, idx: number) => (
            <motion.div key={idx} variants={itemVariants}>
              <BookContent book={data} />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-8"> {/* More spacing */}
          {books?.length > 0 && (
            <Link to="/all-books">
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300"  // Button Style
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Books
              </motion.button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeBook;