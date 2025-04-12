const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Logo or Title */}
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400 animate-pulse">
          ChapterHouse
        </h1>

        {/* Loading Spinner with Animation */}
        <div className="flex items-center justify-center space-x-4">
          <div className="w-10 h-10 border-4 border-t-4 border-indigo-500 border-solid rounded-full animate-spin"></div>
          <span className="text-gray-300 font-medium text-lg animate-pulse">
            Loading...
          </span>
        </div>

        {/* Subtext */}
        <p className="text-gray-400 text-base">
          Please wait while we prepare your experience.
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;