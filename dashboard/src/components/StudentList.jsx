import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import { RiLoader2Line } from "react-icons/ri";
import { BASE_URL } from "../api/url";
import { ImFileEmpty } from "react-icons/im";
import StudentForm from "./StudentForm";

const StudentList = ({
  isLoading,
  students,
  fetchStudents,
  isModelOpen,
  setIsModelOpen,
}) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  const actionBoxRef = useRef();

  const handleEdit = (student) => {
    setSelectedStudent(student._id);
    setEditingStudent(student);
  };

  const handleDelete = async (studentId) => {
    try {
      await axios.delete(`${BASE_URL}/api/delete_student/${studentId}`);
      console.log("deleted");
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        actionBoxRef.current &&
        !actionBoxRef.current.contains(event.target)
      ) {
        setSelectedStudent(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedStudent]);

  return (
    <div className="table-container mt-8 px-3 h-[450px] overflow-y-auto mb-6">
      <table className="relative">
        <thead className="sticky top-0 bg-white shadow-sm z-10">
          <tr className="text-gray-400 sticky text-start border-b">
            <th
              className="font-medium   text-start  p-3"
              style={{ width: "170px", overflow: "hidden" }}
            >
              Name
            </th>
            <th
              className="font-medium   text-start  p-3"
              style={{ width: "260px", overflow: "hidden" }}
            >
              Email
            </th>
            <th
              className="font-medium   text-start  p-3"
              style={{ width: "180px", overflow: "hidden" }}
            >
              Phone no.
            </th>
            <th
              className="font-medium   text-start  p-3"
              style={{ width: "180px", overflow: "hidden" }}
            >
              Course
            </th>
            <th
              className="font-medium   text-start  p-3"
              style={{ width: "150px", overflow: "hidden" }}
            >
              Batch
            </th>
            <th
              className="font-medium   text-start  p-3"
              style={{ width: "150px", overflow: "hidden" }}
            >
              Fee Status
            </th>
            <th
            // className="font-medium   text-start  p-3"
            // style={{ width: "10px", overflow: "hidden" }}
            ></th>
          </tr>
        </thead>

        {students?.length === 0 ? (
          <div className="h-full absolute w-full flex items-center justify-center top-[200px] gap-2 text-[14px] text-gray-400">
            {isLoading ? (
              <>
                <RiLoader2Line size={20} className="animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <ImFileEmpty /> No data Found
              </>
            )}
          </div>
        ) : (
          <tbody className="">
            {students.map((student) => (
              <tr
                className={` ${
                  selectedStudent === student._id && "bg-gray-100"
                } hover:bg-gray-100 cursor-pointer rounded-md`}
                key={student._id}
              >
                <td
                  className="font-normal pr-4 text-gray-700   text-start  p-3 text-[15px]"
                  style={{ maxWidth: "170px", overflow: "hidden" }}
                >
                  {student.name}
                </td>
                <td
                  className="font-normal pr-4 text-gray-700   text-start  p-3 text-[15px]"
                  style={{ maxWidth: "260px", overflow: "hidden" }}
                >
                  {student.email}
                </td>
                <td
                  className="font-normal pr-4 text-gray-700   text-start  p-3 text-[15px]"
                  style={{ maxWidth: "180px", overflow: "hidden" }}
                >
                  {student.mobile}
                </td>
                <td
                  className="font-normal pr-4 text-gray-700   text-start  p-3 text-[15px]"
                  style={{ maxWidth: "180px", overflow: "hidden" }}
                >
                  {student.course}
                </td>
                <td
                  className="font-normal pr-4 text-gray-700   text-start  p-3 text-[15px]"
                  style={{ maxWidth: "150px", overflow: "hidden" }}
                >
                  {student.batch}
                </td>
                <td
                  className={`font-normal pr-4 text-gray-700   text-start  p-3 text-[15px] ${
                    (student.paymentStatus === "Pending" &&
                      "text-orange-500") ||
                    (student.paymentStatus === "Completed" && "text-green-500")
                  }`}
                  style={{ maxWidth: "150px", overflow: "hidden" }}
                >
                  {student.paymentStatus}
                </td>
                <td>
                  <div className="relative">
                    <HiOutlineDotsVertical
                      className="cursor-pointer"
                      onClick={() => setSelectedStudent(student._id)}
                    />
                    {selectedStudent === student._id && (
                      <div
                        ref={actionBoxRef}
                        className="absolute z-[8] right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                      >
                        <button
                          onClick={() => {
                            handleEdit(student), setIsModelOpen(true);
                          }}
                          className=" px-4 py-2 text-sm hover:bg-gray-100 w-full text-left flex items-center gap-1 text-gray-500"
                        >
                          <MdEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(student._id)}
                          className=" px-4 py-2 text-sm hover:bg-gray-100 w-full text-left flex items-center gap-1 text-gray-500"
                        >
                          <MdDeleteOutline /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {isModelOpen && (
        <StudentForm
          onSubmit={fetchStudents}
          setIsModelOpen={setIsModelOpen}
          initialData={editingStudent}
          setEditingStudent={setEditingStudent}
        />
      )}
    </div>
  );
};

export default StudentList;
