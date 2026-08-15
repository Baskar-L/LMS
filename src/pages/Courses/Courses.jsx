import {
    useEffect,
    useState,
} from "react";

import AppLayout from "../../components/Layout/AppLayout";

import CourseTable from "../../components/Courses/CourseTable";

import CourseModal from "../../components/Courses/CourseModal";

import ConfirmModal from "../../components/Common/ConfirmModal";
import ViewCourseModal from "../../components/Courses/ViewCourseModal";
import Pagination from "../../components/Common/Pagination";

import {
    getCourses,
    deleteCourse,
} from "../../api/courseApi";

import { useToast } from "../../context/ToastContext";

const Courses = () => {
    const { showToast } =
        useToast();

    const [courses, setCourses] =
        useState([]);

    const [deleteId, setDeleteId] =
        useState(null);

    const [openModal, setOpenModal] =
        useState(false);

    const [editId, setEditId] =
        useState(null);


    const [viewId, setViewId] =
        useState(null);


    const [page, setPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const [search, setSearch] =
        useState("");

    const [status, setStatus] =
        useState("");

    const [fromDate, setFromDate] =
        useState("");

    const [toDate, setToDate] =
        useState("");

    const fetchCourses =
        async () => {

            try {

                const res =
                    await getCourses({
                        page,
                        limit: 5,
                        search,
                        status,
                        fromDate,
                        toDate,
                    });

                setCourses(
                    res.data
                );

                setTotalPages(
                    res.pagination
                        .totalPages
                );

            } catch {

                showToast(
                    "error",
                    "Failed to load courses"
                );

            }
        };

    useEffect(() => {
        fetchCourses();
    }, [
        page,
        search,
        status,
        fromDate,
        toDate,
    ]);

    const handleDelete =
        async () => {
            try {
                await deleteCourse(
                    deleteId
                );

                showToast(
                    "success",
                    "Course deleted successfully"
                );

                fetchCourses();

                setDeleteId(null);
            } catch {
                showToast(
                    "error",
                    "Delete failed"
                );
            }
        };

    return (
        <AppLayout>

            <div className="page-container">

                <div className="flex justify-between items-center">

                    <h1 className="page-title">
                        Courses
                    </h1>

                    <button
                        onClick={() => {
                            setEditId(null);
                            setOpenModal(true);
                        }}
                        className="primary-btn"
                    >
                        Add Course
                    </button>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Search
                        </label>

                        <input
                            type="text"
                            placeholder="Title, Instructor, Category"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="w-full h-9 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#254593]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                                setPage(1);
                            }}
                            className="w-full h-9 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#254593]"
                        >
                            <option value="">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            From Date
                        </label>

                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => {
                                setFromDate(e.target.value);
                                setPage(1);
                            }}
                            className="w-full h-9 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#254593]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            To Date
                        </label>

                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => {
                                setToDate(e.target.value);
                                setPage(1);
                            }}
                            className="w-full h-9 px-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#254593]"
                        />
                    </div>

                </div>




                <CourseTable
                    courses={courses}
                      page={page}
                    onDelete={setDeleteId}
                    onEdit={(id) => {
                        setEditId(id);
                        setOpenModal(true);
                    }}
                    onView={(id) => {
                        setViewId(id);
                    }}
                />

                <Pagination
                    page={page}
                    totalPages={
                        totalPages
                    }
                    onPageChange={
                        setPage
                    }
                />

            </div>

            <CourseModal
                isOpen={openModal}
                courseId={editId}
                onClose={() =>
                    setOpenModal(false)
                }
                refreshCourses={
                    fetchCourses
                }
            />

            <ConfirmModal
                isOpen={!!deleteId}
                title="Delete Course"
                message="Are you sure?"
                onConfirm={
                    handleDelete
                }
                onCancel={() =>
                    setDeleteId(null)
                }
            />


            <ViewCourseModal
                isOpen={!!viewId}
                courseId={viewId}
                onClose={() =>
                    setViewId(null)
                }
            />

        </AppLayout>
    );
};

export default Courses;