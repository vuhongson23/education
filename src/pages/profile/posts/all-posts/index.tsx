import { useOutletContext } from "react-router-dom";

const AllPosts = () => {
  const value = useOutletContext();
  console.log("🚀 ~ AllPosts ~ value:", value);
  return <div>All Post</div>;
};

export default AllPosts;
