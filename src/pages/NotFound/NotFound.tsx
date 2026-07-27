import { useNavigate } from "react-router-dom";
import { MdOutlineSearchOff } from "react-icons/md";

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="flex justify-center items-center px-2 lg:px-0 h-dvh ">
      <div className="text-center border border-border rounded-2xl py-10 px-5 lg:w-[50%]">
        <div className="flex justify-center items-center ">
          <div className="bg-accent w-fit rounded-full p-5 mb-5">
            <MdOutlineSearchOff color="white" size="30" />
          </div>
        </div>
        <h1 className="text-accent text-8xl">404</h1>
        <h2 className="text-text my-2"> Page Not Found </h2>
        <p>
          {" "}
          The page you're looking for doesn't exist or may have been moved.{" "}
        </p>

        <button
          onClick={() => navigate("/me")}
          className="w-full lg:w-fit text-accent hover:bg-accent hover:text-text border border-accent px-5 py-3 rounded-2xl mt-5 text-sm"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default NotFound;
