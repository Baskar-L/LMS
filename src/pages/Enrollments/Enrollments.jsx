import {
    useEffect,
    useState,
} from "react";

import { Link } from "react-router-dom";

import AppLayout from "../../components/Layout/AppLayout";

import EnrollmentTable from "../../components/Enrollments/EnrollmentTable";

import ViewEnrollmentModal from "../../components/Enrollments/ViewEnrollmentModal";

import ConfirmModal from "../../components/Common/ConfirmModal";
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

    const loadData =
        async () => {
            const response =
                await getEnrollments();

            setEnrollments(
                response.data || []
            );
        };

    useEffect(() => {
        loadData();
    }, []);

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

                <EnrollmentTable
                    enrollments={enrollments}
                    onDelete={setDeleteId}
                    onView={setViewId}
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