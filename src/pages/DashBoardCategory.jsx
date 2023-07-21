import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  console.log(categories);

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
                  <button className="btn btn-info">Edit</button>
                  <button className="btn btn-danger">Delete</button>
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
