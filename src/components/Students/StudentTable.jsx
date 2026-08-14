import {
    FiEdit,
    FiTrash2,
    FiEye,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import {
    formatDate,
} from "../../utils/helpers";

const StudentTable = ({
    students,
    onDelete,
    onEdit,
    onView,
}) => {
    return (
        <div className="table-wrapper">
            <table className="common-table">
                <thead className="table-header">
                    <tr>
                        <th className="table-th">
                            Name
                        </th>

                        <th className="table-th">
                            Email
                        </th>

                        <th className="table-th">
                            Created
                        </th>

                        <th className="table-th">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {students.map(
                        (student) => (
                            <tr
                                key={student._id}
                                className="table-row"
                            >
                                <td className="table-td">
                                    {student.name}
                                </td>

                                <td className="table-td">
                                    {student.email}
                                </td>

                                <td className="table-td">
                                    {formatDate(
                                        student.createdAt
                                    )}
                                </td>

                                <div className="flex gap-3">

                                    <button
                                        onClick={() =>
                                            onView(student._id)
                                        }
                                    >
                                        <FiEye
                                            size={16}
                                            className="text-blue-500"
                                        />
                                    </button>

                                    <button
                                        onClick={() =>
                                            onEdit(student._id)
                                        }
                                    >
                                        <FiEdit
                                            size={16}
                                            className="text-green-500"
                                        />
                                    </button>

                                    <button
                                        onClick={() =>
                                            onDelete(student._id)
                                        }
                                    >
                                        <FiTrash2
                                            size={16}
                                            className="text-red-500"
                                        />
                                    </button>

                                </div>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;