import {
    useEffect,
    useState,
} from "react";

import AppLayout from "../../components/Layout/AppLayout";

import CourseTable from "../../components/Courses/CourseTable";

import CourseModal from "../../components/Courses/CourseModal";

import ConfirmModal from "../../components/Common/ConfirmModal";
import ViewCourseModal from "../../components/Courses/ViewCourseModal";

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

    const fetchCourses =
        async () => {
            try {
                const res =
                    await getCourses();

                setCourses(
                    res.data || []
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
    }, []);

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




                <CourseTable
                    courses={courses}
                    onDelete={setDeleteId}
                    onEdit={(id) => {
                        setEditId(id);
                        setOpenModal(true);
                    }}
                    onView={(id) => {
                        setViewId(id);
                    }}
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