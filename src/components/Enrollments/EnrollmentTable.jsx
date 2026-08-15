import {
    FiEye,
    FiTrash2,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import StatusBadge from "./StatusBadge";

import {
    formatDate,
} from "../../utils/helpers";

const EnrollmentTable = ({
    enrollments,
    onDelete,
      onView,
}) => {
    return (
        <div className="table-wrapper">
            <table className="common-table">
                <thead className="table-header">
                    <tr>
                        <th className="table-th">
                            Student
                        </th>

                        <th className="table-th">
                            Email
                        </th>

                        <th className="table-th">
                            Course
                        </th>

                        <th className="table-th">
                            Date
                        </th>

                        <th className="table-th">
                            Status
                        </th>

                        <th className="table-th">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {enrollments.map(
                        (enrollment) => (
                            <tr
                                key={
                                    enrollment._id
                                }
                                className="table-row"
                            >
                                <td className="table-td">
                                    {
                                        enrollment
                                            .studentId
                                            ?.name
                                    }
                                </td>

                                <td className="table-td">
                                    {
                                        enrollment
                                            .studentId
                                            ?.email
                                    }
                                </td>

                                <td className="table-td">
                                    {
                                        enrollment
                                            .courseId
                                            ?.title
                                    }
                                </td>

                                <td className="table-td">
                                    {formatDate(
                                        enrollment.enrollmentDate
                                    )}
                                </td>

                                <td className="table-td">
                                    <StatusBadge
                                        status={
                                            enrollment.status
                                        }
                                    />
                                </td>

                                <td className="table-td">
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() =>
                                                onView(
                                                    enrollment._id
                                                )
                                            }
                                        >
                                            <FiEye size={18} className="text-blue-500 cursor-pointer" />
                                        </button>

                                        <button
                                            onClick={() =>
                                                onDelete(
                                                    enrollment._id
                                                )
                                            }
                                        >
                                            <FiTrash2 size={18} className="text-red-500 cursor-pointer" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EnrollmentTable;