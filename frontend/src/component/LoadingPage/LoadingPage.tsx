import "./LoadingPage.css";

const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-900 flex items-center justify-center">
      <div className="text-center">
        {/* Logo or Title (Optional) */}
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-4 fade-in-infinite">
          Boundless Reads
        </h1>

        {/* Loading Spinner with Animation */}
        <div className="flex justify-center items-center space-x-2 bounce-in">
          <div className="w-12 h-12 border-4 border-t-4 border-purple-500 border-solid rounded-full spinner"></div>
          <div
            className="text-white font-semibold text-lg fade-in"
            style={{ animationDelay: "1s" }}
          >
            Loading...
          </div>
        </div>

        {/* Subtext (Optional) */}
        <p
          className="mt-4 text-lg text-white fade-in"
          style={{ animationDelay: "2s" }}
        >
          Please wait while we get things ready for you.
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
