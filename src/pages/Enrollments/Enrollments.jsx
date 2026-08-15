import {
    useEffect,
    useState,
} from "react";

import { Link } from "react-router-dom";

import AppLayout from "../../components/Layout/AppLayout";

import EnrollmentTable from "../../components/Enrollments/EnrollmentTable";

import EnrollmentModal from "../../components/Enrollments/EnrollmentModal";

import ViewEnrollmentModal from "../../components/Enrollments/ViewEnrollmentModal";

import ConfirmModal from "../../components/Common/ConfirmModal";
import Pagination from "../../components/Common/Pagination";
import {
    useToast,
} from "../../context/ToastContext";

import {
    getEnrollments,
    deleteEnrollment,
} from "../../api/enrollmentApi";

const Enrollments = () => {
    const [enrollments, setEnrollments] =
        useState([]);

    const [openFormModal, setOpenFormModal] =
        useState(false);

    const [viewId, setViewId] =
        useState(null);

    const { showToast } =
        useToast();

    const [deleteId, setDeleteId] =
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

    const loadData =
        async () => {

            const response =
                await getEnrollments({
                    page,
                    limit: 5,
                    search,
                    status,
                    fromDate,
                    toDate,
                });

            setEnrollments(
                response.data || []
            );

            setTotalPages(
                response.pagination
                    ?.totalPages || 1
            );
        };

    useEffect(() => {
        loadData();
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

                await deleteEnrollment(
                    deleteId
                );

                showToast(
                    "success",
                    "Enrollment deleted successfully"
                );

                loadData();

            } catch {

                showToast(
                    "error",
                    "Delete failed"
                );

            }

            setDeleteId(null);
        };


    const handleStatusChange =
        async (id, status) => {
            try {
                await updateEnrollmentStatus(
                    id,
                    status
                );

                showToast(
                    "success",
                    "Status updated"
                );

                loadData();
            } catch {
                showToast(
                    "error",
                    "Update failed"
                );
            }
        };

    return (
        <AppLayout>
            <div className="page-container">
                <div className="flex justify-between items-center">
                    <h1 className="page-title">
                        Enrollments
                    </h1>

                    <button
                        onClick={() =>
                            setOpenFormModal(true)
                        }
                        className="primary-btn"
                    >
                        New Enrollment
                    </button>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Search
                        </label>

                        <input
                            type="text"
                            value={search}
                            placeholder="Student / Email / Course"
                            onChange={(e) => {
                                setSearch(
                                    e.target.value
                                );
                                setPage(1);
                            }}
                            className="w-full h-10 px-3 border rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) => {
                                setStatus(
                                    e.target.value
                                );
                                setPage(1);
                            }}
                            className="w-full h-10 px-3 border rounded-lg"
                        >
                            <option value="">
                                All Status
                            </option>

                            <option value="In Progress">
                                In Progress
                            </option>

                            <option value="Completed">
                                Completed
                            </option>
                        </select>
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
                            className="w-full h-10 px-3 border rounded-lg"
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
                            className="w-full h-10 px-3 border rounded-lg"
                        />
                    </div>

                </div>

                <EnrollmentTable
                    enrollments={enrollments}
                    page={page}
                    onDelete={setDeleteId}
                    onView={setViewId}
                    onStatusChange={
                        handleStatusChange
                    }
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

            <ConfirmModal
                isOpen={!!deleteId}
                title="Delete Enrollment"
                message="Are you sure?"
                onConfirm={
                    handleDelete
                }
                onCancel={() =>
                    setDeleteId(null)
                }
            />


            <EnrollmentModal
                isOpen={openFormModal}
                onClose={() =>
                    setOpenFormModal(false)
                }
                refreshData={loadData}
            />

            <ViewEnrollmentModal
                isOpen={!!viewId}
                enrollmentId={viewId}
                onClose={() =>
                    setViewId(null)
                }
            />
        </AppLayout>
    );
};

export default Enrollments;