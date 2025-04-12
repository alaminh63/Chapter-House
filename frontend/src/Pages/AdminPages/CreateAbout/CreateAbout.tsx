import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import {
  useGetAllAboutQuery,
  useUpdateAboutMutation,
} from "../../../Redux/api/features/About/aboutManagementApi";
import LoadingPage from "../../../component/LoadingPage/LoadingPage";
import { toast } from "sonner";
import { sonarId } from "../../../utils/Fucntion/sonarId";

const CreateAbout = () => {
  const [updateAbout] = useUpdateAboutMutation();
  const { data, isLoading } = useGetAllAboutQuery(undefined);

  const aboutData = data?.data[0];
  //   console.log("data: ", aboutData);

  const editor = useRef(null);
  const [content, setContent] = useState(aboutData?.data);
  const handleSave = async () => {
    // console.log("Content: ", content);
    toast.loading("Updating about", { id: sonarId });
    const updateData = { data: content };
    const res = await updateAbout({ id: aboutData?._id, updateData }).unwrap();
    if (res?.status) {
      toast.success("About Updated Successfully", { id: sonarId });
    }
  };

  // Update content when aboutData changes
  useEffect(() => {
    if (aboutData?.data) {
      setContent(aboutData.data);
    }
  }, [aboutData]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="p-4">
      <div>
        <h1 className="text-xl text-white my-10 font-bold">Blog</h1>

        <div>
          <JoditEditor
            ref={editor}
            value={content}
            tabIndex={1}
            onChange={(newContent) => setContent(newContent)}
            className="text-black bg-white"
            id="editor"
          />
          <button
            className="btn btn-primary text-white my-4"
            onClick={() => handleSave()}
          >
            Save Change{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAbout;
