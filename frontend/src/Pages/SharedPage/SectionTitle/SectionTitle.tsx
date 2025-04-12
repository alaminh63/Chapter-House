import React from 'react';
import { motion } from 'framer-motion';

interface Iprops {
    heading: string;
    subHeading: string;
}

const SectionTitle = ({ heading, subHeading }: Iprops) => {
    const containerVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.2,
                duration: 0.8,
                ease: "easeInOut",
                staggerChildren: 0.2,
            },
        },
    };

    const subheadingVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    const headingVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    const underlineVariants = {
        hidden: { scaleX: 0 },
        visible: { scaleX: 1, originX: 0, transition: { duration: 0.8, ease: "easeInOut" } },
    };

    return (
        <motion.div
            className="w-full text-center py-12 px-4 md:px-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Subheading */}
            <motion.div
                className="inline-block mb-4 overflow-hidden"
                variants={subheadingVariants}
            >
                <span className="text-purple-500 font-semibold relative text-lg md:text-xl">
                    {subHeading}
                    <motion.span
                        className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-purple-600 origin-left"
                        variants={underlineVariants}
                        style={{ originX: 0 }}
                    />
                </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight"
                variants={headingVariants}
            >
                {heading}
            </motion.h2>

            {/* Decorative Element (Optional) */}
            <div className="mt-6 flex justify-center">
                <motion.div
                    className="w-24 h-1 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"
                    variants={underlineVariants}
                />
            </div>
        </motion.div>
    );
};

export default SectionTitle;