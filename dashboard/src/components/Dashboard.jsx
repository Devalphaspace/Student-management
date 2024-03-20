import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import SearchBar from "./SearchBar";
import FilterOptions from "./FilterOptions";
import { FiPlus } from "react-icons/fi";
import { PiExport } from "react-icons/pi";
import axios from "axios";
import { BASE_URL } from "../api/url";

const Dashboard = () => {
  const { reset } = useForm();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({});
  const [isModelOpen, setIsModelOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setIsLoading(true);
    try {
      // Fetch students data
      const response = await axios.get(`${BASE_URL}/api/get_students`);
      const data = await response.data;
      setStudents(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Apply search and filters to student data
  let filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.mobile.includes(searchQuery)
  );

  if (filters.batch) {
    filteredStudents = filteredStudents.filter(
      (student) => student.batch === filters.batch
    );
  }
  if (filters.paymentStatus) {
    filteredStudents = filteredStudents.filter(
      (student) => student.paymentStatus === filters.paymentStatus
    );
  }

  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/add_student`, data);
      const newStudent = response.data;
      setStudents([...students, newStudent]);
      reset();
      setIsModelOpen(false);
    } catch (error) {
      console.error("Error adding student: ", error);
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Mobile",
      "Course",
      "Batch",
      "Payment Status",
    ];
    const csvData = [headers.join(",")];

    filteredStudents.forEach((student) => {
      const row = [
        student.name,
        student.email,
        student.mobile,
        student.course,
        student.batch,
        student.paymentStatus,
      ];
      csvData.push(row.join(","));
    });

    const csvContent = csvData.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "students.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-fit  border bg-[#fff] rounded-md px-3 shadow-lg">
      <div className="w-full border-b border-gray-200 py-4 px-3 flex items-center gap-2">
        <img src="/logo.png" className="w-[25px]" alt="" />
        <h1 className="font-medium text-[1.1rem]">Student Dashboard</h1>
      </div>
      <div className="flex items-center mt-8 px-3 justify-between">
        <div className=" flex items-center justify-center gap-6 text-gray-700">
          <SearchBar onSearch={handleSearch} />
          <FilterOptions
            onFilterChange={handleFilterChange}
            fetchStudents={fetchStudents}
          />
          <button
            className=" flex items-center gap-2 ml-3 border bg-gray-100 p-2 px-3 rounded-md"
            onClick={exportToCSV}
          >
            <PiExport size={20} />
            Export
          </button>
        </div>

        <button
          className="bg-[#007aff] text-white p-2 px-3 rounded-md flex items-center justify-center gap-1"
          onClick={() => setIsModelOpen(true)}
        >
          <FiPlus /> Add New
        </button>

        {isModelOpen && (
          <StudentForm
            onSubmit={handleFormSubmit}
            isModelOpen={isModelOpen}
            setIsModelOpen={setIsModelOpen}
          />
        )}
      </div>
      <StudentList
        isLoading={isLoading}
        isModelOpen={isModelOpen}
        setIsModelOpen={setIsModelOpen}
        fetchStudents={fetchStudents}
        students={filteredStudents}
      />
    </div>
  );
};

export default Dashboard;
