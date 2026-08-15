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
import Pagination from "../../components/Common/Pagination";
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

    const [page, setPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const [search, setSearch] =
        useState("");

    const [fromDate, setFromDate] =
        useState("");

    const [toDate, setToDate] =
        useState("");

    const loadStudents =
        async () => {
            try {
                const response =
                    await getStudents({
                        page,
                        limit: 5,
                        search,
                        fromDate,
                        toDate,
                    });

                setStudents(
                    response.data || []
                );

                setTotalPages(
                    response.pagination
                        ?.totalPages || 1
                );
            } catch {
                showToast(
                    "error",
                    "Failed to load students"
                );
            }
        };

    useEffect(() => {
        loadStudents();
    }, [
        page,
        search,
        fromDate,
        toDate,
    ]);

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

                <div className="grid md:grid-cols-3 gap-4 mb-5">

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Search
                        </label>

                        <input
                            type="text"
                            value={search}
                            placeholder="Name / Email"
                            onChange={(e) => {
                                setSearch(
                                    e.target.value
                                );
                                setPage(1);
                            }}
                            className="
        w-full
        h-10
        px-3
        border
        rounded-md
      "
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            From Date
                        </label>

                        <input
                            type="date"
                            value={fromDate}
                            onChange={(e) => {
                                setFromDate(
                                    e.target.value
                                );
                                setPage(1);
                            }}
                            className="
        w-full
        h-10
        px-3
        border
        rounded-md
      "
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            To Date
                        </label>

                        <input
                            type="date"
                            value={toDate}
                            onChange={(e) => {
                                setToDate(
                                    e.target.value
                                );
                                setPage(1);
                            }}
                            className="
        w-full
        h-10
        px-3
        border
        rounded-md
      "
                        />
                    </div>

                </div>
                <StudentTable
                    students={students}
                     page={page}
                    onDelete={setDeleteId}
                    onView={setViewId}
                    onEdit={(id) => {
                        setEditId(id);
                        setOpenModal(true);
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