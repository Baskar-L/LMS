import {
    useEffect,
    useState,
} from "react";

import { Link } from "react-router-dom";

import AppLayout from "../../components/Layout/AppLayout";

import StudentTable from "../../components/Students/StudentTable";

import ConfirmModal from "../../components/Common/ConfirmModal";

import StudentModal from "../../components/Students/StudentModal";

import ViewStudentModal from "../../components/Students/ViewStudentModal";

import { useToast } from "../../context/ToastContext";

import {
    getStudents,
    deleteStudent,
} from "../../api/studentApi";

const Students = () => {
    const [students, setStudents] =
        useState([]);

    const [deleteId, setDeleteId] =
        useState(null);

    const { showToast } =
        useToast();

    const [openModal, setOpenModal] =
        useState(false);

    const [editId, setEditId] =
        useState(null);

    const [viewId, setViewId] =
        useState(null);

    const loadStudents =
        async () => {
            const response =
                await getStudents();

            setStudents(
                response.data || []
            );
        };

    useEffect(() => {
        loadStudents();
    }, []);

    const handleDelete =
        async () => {

            try {

                await deleteStudent(
                    deleteId
                );

                showToast(
                    "success",
                    "Student deleted successfully"
                );

                loadStudents();

            } catch {

                showToast(
                    "error",
                    "Delete failed"
                );

            }

            setDeleteId(null);
        };

    return (
        <AppLayout>
            <div className="page-container">
                <div className="flex justify-between items-center">
                    <h1 className="page-title">
                        Students
                    </h1>

                    <button
                        onClick={() => {
                            setEditId(null);
                            setOpenModal(true);
                        }}
                        className="primary-btn"
                    >
                        Add Student
                    </button>
                </div>
                <StudentTable
                    students={students}
                    onDelete={setDeleteId}
                    onView={setViewId}
                    onEdit={(id) => {
                        setEditId(id);
                        setOpenModal(true);
                    }}
                />
            </div>


            <StudentModal
                isOpen={openModal}
                studentId={editId}
                onClose={() =>
                    setOpenModal(false)
                }
                refreshStudents={
                    loadStudents
                }
            />

            <ViewStudentModal
                isOpen={!!viewId}
                studentId={viewId}
                onClose={() =>
                    setViewId(null)
                }
            />

            <ConfirmModal
                isOpen={!!deleteId}
                title="Delete Student"
                message="Are you sure?"
                onConfirm={
                    handleDelete
                }
                onCancel={() =>
                    setDeleteId(null)
                }
            />
        </AppLayout>
    );
};

export default Students;