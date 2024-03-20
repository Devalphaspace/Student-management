import { useState } from "react";
import { MdOutlineFilterList } from "react-icons/md";

const FilterOptions = ({ onFilterChange, fetchStudents }) => {
  const [batch, setBatch] = useState("");
  const [paymentStatus, setpaymentStatus] = useState("");

  const handleBatchChange = (e) => {
    const selectedBatch = e.target.value;

    setBatch(selectedBatch);
    if (selectedBatch === "All") {
      onFilterChange({ batch: "", paymentStatus });
      setpaymentStatus("");
      fetchStudents();
    } else {
      onFilterChange({ batch: selectedBatch, paymentStatus });
    }
  };

  const handlepaymentStatusChange = (e) => {
    const selectedpaymentStatus = e.target.value;

    setpaymentStatus(selectedpaymentStatus);
    if (selectedpaymentStatus === "All") {
      onFilterChange({ batch, paymentStatus: "" });
      setBatch("");
      fetchStudents();
    } else {
      onFilterChange({ batch, paymentStatus: selectedpaymentStatus });
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 relative">
      <p className="flex items-center gap-1 font-medium text-gray-500">
        <MdOutlineFilterList size={20} /> Filter
      </p>

      {/* --------- Filter box------------ */}
      <div className="relative">
        <p className="text-[14px] absolute -top-[12px] bg-white left-1 text-gray-400">
          Batch
        </p>
        <select
          className="border border-gray-300 p-2 px-3 rounded-md w-[90px]"
          value={batch}
          onChange={handleBatchChange}
        >
          <option value="">All</option>
          <option value="Batch A">A</option>
          <option value="Batch B">B</option>
          <option value="Batch C">C</option>
          <option value="Batch D">D</option>
        </select>
      </div>

      <div className=" relative">
        <p className="text-[14px] absolute -top-[12px] bg-white left-1 text-gray-400">
          Fee Status
        </p>
        <select
          className="border border-gray-300 p-2 px-3 rounded-md"
          value={paymentStatus}
          onChange={handlepaymentStatusChange}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      {/* --------- Filter box------------ */}
    </div>
  );
};

export default FilterOptions;
