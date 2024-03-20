import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import { BASE_URL } from "../api/url";

const StudentForm = ({
  onSubmit,
  setIsModelOpen,
  initialData,
  setEditingStudent,
}) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key, initialData[key]);
      });
    }
  }, [initialData, setValue]);

  const handleFormSubmit = async (data) => {
    try {
      if (initialData) {
        await axios.put(
          `${BASE_URL}/api/update_student/${initialData._id}`,
          data
        );
      } else {
        await axios.post(`${BASE_URL}/api/add_student`, data);
      }
      onSubmit();
      setEditingStudent(null);
      setIsModelOpen(false);
    } catch (error) {
      console.error("Error updating student: ", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-black/40 z-20">
      <form
        className="bg-white flex flex-col w-[390px] p-6 py-7 rounded-md gap-3 relative"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="absolute -top-2 -right-2">
          <RxCross2
            onClick={() => {
              setIsModelOpen(false), setEditingStudent(null);
            }}
            className="bg-white text-red-500 rounded-full shadow-md text-xl p-[2px] cursor-pointer"
          />
        </div>
        <input
          placeholder="Student name"
          type="text"
          {...register("name", { required: true })}
          className="border border-gray-300 p-2 px-3 rounded-md"
        />
        <input
          placeholder="Email address"
          type="email"
          {...register("email", { required: true })}
          className="border border-gray-300 p-2 px-3 rounded-md"
        />
        <input
          placeholder="Phone no."
          type="text"
          {...register("mobile", { required: true })}
          className="border border-gray-300 p-2 px-3 rounded-md"
        />
        <input
          placeholder="Course name"
          type="text"
          {...register("course", { required: true })}
          className="border border-gray-300 p-2 px-3 rounded-md"
        />
        <select
          className="flex-1 w-full flex gap-3 border border-gray-300 p-2 px-3 rounded-md"
          {...register("batch", { required: true })}
        >
          <option value="">Select Batch</option>
          <option value="Batch A">Batch A</option>
          <option value="Batch B">Batch B</option>
          <option value="Batch C">Batch C</option>
          <option value="Batch D">Batch D</option>
        </select>
        <select
          className="flex-1 w-full flex gap-3 border border-gray-300 p-2 px-3 rounded-md"
          {...register("paymentStatus", { required: true })}
        >
          <option value="">Payment Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button
          className="bg-[#007aff] text-white p-2 px-3 rounded-md"
          type="submit"
        >
          {initialData ? "Update Details" : "Add Details"}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
