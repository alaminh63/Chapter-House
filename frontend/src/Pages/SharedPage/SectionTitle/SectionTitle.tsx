interface Iprops {
  heading: string;
  subHeading: string;
}
const SectionTitle = ({ heading, subHeading }: Iprops) => {
  return (
    <div className="w-11/12 md:w-8/12 mx-auto text-center my-12">
      <p className="text-purple-600 mb-2 text-lg italic font-semibold">
        <span className="border-b-4 border-purple-500 pb-1">{subHeading}</span>
      </p>
      <h3 className="text-4xl md:text-5xl font-extrabold text-purple-800 uppercase relative">
        {heading}
      </h3>
    </div>
  );
};

export default SectionTitle;
