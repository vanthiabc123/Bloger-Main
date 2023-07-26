import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const DashBoardPosts = () => {
  const [posts, setPosts] = useState([]);
  const postRef = collection(db, "posts");

  const getPosts = async () => {
    const querySnapshot = await getDocs(postRef);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setPosts(data);
  };
  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = (id) => async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this imaginary file!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteDoc(doc(db, "posts", id));
          Swal.fire(
            "Deleted!",
            "Your imaginary file has been deleted.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
        }
      });
    } catch (error) {
      console.log(error);
    }
    getPosts();
  };

  return (
    <>
      <div className="overflow-x-auto h-screen text-black">
        <Link to={"/admin/products/add"} className="btn btn-info">
          Add Post
        </Link>
        <table className="table">
          {/* head */}
          <thead className="text-black font-semibold">
            <tr>
              <th>ID</th>
              <th>image</th>
              <th>Name</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {posts.map((post) => (
              <tr key={post.id}>
                <th>{post.id}</th>
                <td>
                  <img
                    src={post.image}
                    className="w-[50px] h-[50px] object-cover rounded-lg"
                    alt=""
                  />
                </td>
                <td>{post.title}</td>
                <td>{post.slug}</td>
                <td>{post.category}</td>
                <td>{post.status === "1" ? "Active" : "pending"}</td>
                <td className="flex gap-x-2">
                  <Link to={`/editPost/${post.id}`} className="btn btn-info">
                    Edit
                  </Link>
                  <button
                    type="button"
                    onClick={deletePost(post.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashBoardPosts;
