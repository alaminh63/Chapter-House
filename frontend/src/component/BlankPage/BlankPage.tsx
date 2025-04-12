interface Iprops {
  data: string;
}

const BlankPage = ({ data }: Iprops) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 to-red-900 flex items-center justify-center text-white">
      <div className="text-center p-8 bg-white/10 rounded-2xl shadow-lg backdrop-blur-md max-w-lg">
        <h1 className="text-3xl font-bold mb-4">⚠️ Important Notice</h1>
        <p className="text-lg mb-6">{data}</p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          onClick={() => alert("Button Clicked!")}
        >
          Take Action
        </button>
      </div>
    </div>
  );
};

export default BlankPage;
