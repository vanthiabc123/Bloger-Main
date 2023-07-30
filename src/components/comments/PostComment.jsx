import React from "react";
import { db } from "../../firebase/firebaseConfig";
import {
  doc,
  query,
  where,
  onSnapshot,
  collection,
  addDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const PostComment = ({ postId, user }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const q = query(
        collection(db, "comments"),
        where("postId", "==", postId)
      );
      onSnapshot(q, (querySnapshot) => {
        const results = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setComments(results);
      });
    };
    getData();
  }, [postId]);
  const sendComment = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, "comments"), {
        content: content,
        createdAt: serverTimestamp(),
        postId: postId,
        userId: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
      setContent("");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteComment = (id, userId) => async () => {
    console.log(id);
    if (user.uid === userId) {
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
            await deleteDoc(doc(db, "comments", id));
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
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You don't have permission to delete this comment",
      });
    }
  };

  return (
    <div className="pb-5">
      <form>
        <textarea
          id="content"
          className="w-full p-4 bg-transparent border border-gray-200 rounded-lg outline-none resize-none min-h-[200px]"
          placeholder="Enter description"
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />

        <div className="flex justify-end">
          <button
            type="submit"
            onClick={sendComment}
            className="inline-flex items-center justify-center px-5 py-3 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg"
          >
            {loading ? (
              <div className="w-10 h-10 border-4 border-white rounded-full animate-spin border-t-transparent"></div>
            ) : (
              "Post Comment"
            )}
          </button>
        </div>
      </form>
      <div className="mt-5">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex items-center gap-x-5 bg-gray-300 rounded-lg p-3 mb-3 text-black"
          >
            <img
              src={
                comment?.photoURL || "https://picsum.photos/seed/picsum/200/300"
              }
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col gap-x-5 w-full">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  {comment?.displayName}
                </h3>
                <span>
                  {new Date(comment?.createdAt?.toDate()).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center w-full">
                <p>{comment?.content}</p>
              </div>
              <div className="flex justify-end">
                <span
                  onClick={handleDeleteComment(comment?.id, comment?.userId)}
                  className="cursor-pointer"
                >
                  {user.uid === comment?.userId ? <div>Xóa</div> : <div></div>}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostComment;
