interface IProps {
  heading: string;
  subHeading: string;
}

const SectionTitle = ({ heading, subHeading }: IProps) => {
  return (
    <div className="w-11/12 md:w-10/12 mx-auto text-center my-8">
      {/* Subheading: subtle, theme-adaptive accent */}
      <p className="text-sm font-medium tracking-wide uppercase mb-1.5 text-gray-500 dark:text-gray-400">
        <span className="border-b-2 border-blue-500 dark:border-blue-400 pb-0.5">
          {subHeading}
        </span>
      </p>

      {/* Heading: clean, bold, theme-adaptive */}
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-50">
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;