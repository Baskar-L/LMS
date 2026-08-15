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
    page,
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
                            S.No
                        </th>
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

                    {students?.length > 0 ? (

                        students.map(
                            (
                                student,
                                index
                            ) => (
                                <tr
                                    key={student._id}
                                    className="table-row"
                                >

                                    <td className="table-td">
                                        {(page - 1) * 5 +
                                            index +
                                            1}
                                    </td>

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

                                    <td className="table-td">
                                        <div className="flex gap-3">

                                            <button
                                                onClick={() =>
                                                    onView(
                                                        student._id
                                                    )
                                                }
                                            >
                                                <FiEye
                                                    size={18}
                                                    className="text-blue-500 cursor-pointer"
                                                />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    onEdit(
                                                        student._id
                                                    )
                                                }
                                            >
                                                <FiEdit
                                                    size={18}
                                                    className="text-green-500 cursor-pointer"
                                                />
                                            </button>

                                            <button
                                                onClick={() =>
                                                    onDelete(
                                                        student._id
                                                    )
                                                }
                                            >
                                                <FiTrash2
                                                    size={18}
                                                    className="text-red-500 cursor-pointer"
                                                />
                                            </button>

                                        </div>
                                    </td>

                                </tr>
                            )
                        )

                    ) : (

                        <tr>

                            <td
                                colSpan="5"
                                className="
          text-center
          py-6
          text-gray-500
        "
                            >
                                No Students Found
                            </td>

                        </tr>

                    )}

                </tbody>
            </table>
        </div>
    );
};

export default StudentTable;