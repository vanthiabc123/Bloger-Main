import { db } from "../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../contexts/authContext";
const DashBoardCategory = () => {
  const [categories, setCategories] = useState([]);

  const categoryRef = collection(db, "categories");

  const getCategories = async () => {
    const querySnapshot = await getDocs(categoryRef);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setCategories(data);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const deleteCategory = (id) => async () => {
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
          await deleteDoc(doc(db, "categories", id));
          Swal.fire(
            "Deleted!",
            "Your imaginary file has been deleted.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
        }
      });

      getCategories();
    } catch (error) {
      console.log(error);
    }
  };
  const { user } = useAuth();
  if (user.role !== "admin") return <h1>You are not admin</h1>;

  return (
    <div>
      <div className="overflow-x-auto h-screen">
        <Link to={"/admin/add-category"} className="btn btn-info">
          Add Category
        </Link>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.category}</td>
                <td>{category.slug}</td>
                <td className="flex gap-x-2">
                  <Link
                    to={`/admin/edit-category/${category.id}`}
                    className="btn btn-info"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={deleteCategory(category.id)}
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
    </div>
  );
};

export default DashBoardCategory;
