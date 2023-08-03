import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/authContext";

const DashBoardPosts = () => {
  const [posts, setPosts] = useState([]);
  const postRef = collection(db, "posts");
  const { user } = useAuth();
  const [userId, setUserId] = useState({ id: "", email: "", role: "" });
  useEffect(() => {
    async function FetchUserData() {
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUserId({
          id: doc.id,
          email: doc.data().email,
          role: doc.data().role,
          displayName: doc.data().displayName,
        });
      });
    }
    FetchUserData();
  }, [user.uid]);

  const navigate = useNavigate();
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
  if (userId.role !== "admin") return <h1>You are not admin</h1>;
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
