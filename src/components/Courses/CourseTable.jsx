import {
    FiEdit,
    FiTrash2,
    FiEye,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import {
    formatDate,
} from "../../utils/helpers";

const CourseTable = ({
    courses,
    onDelete,
    onEdit,
}) => {
    return (
        <div className="table-wrapper">
            <table className="common-table">
                <thead className="table-header">
                    <tr>
                        <th className="table-th">
                            Title
                        </th>

                        <th className="table-th">
                            Instructor
                        </th>

                        <th className="table-th">
                            Category
                        </th>

                        <th className="table-th">
                            Duration
                        </th>

                        <th className="table-th">
                            Description
                        </th>

                        <th className="table-th">
                            Status
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
                    {courses.map((course) => (
                        <tr
                            key={course._id}
                            className="table-row"
                        >
                            <td className="table-td">
                                {course.title}
                            </td>

                            <td className="table-td">
                                {
                                    course.instructorName
                                }
                            </td>

                            <td className="table-td">
                                {course.category}
                            </td>

                            <td className="table-td max-w-xs">
                               
                                    {course.description}
                              
                            </td>

                            <td className="table-td">
                                {course.duration}
                            </td>

                            <td className="table-td">
                                <span
                                    className={
                                        course.status ===
                                            "Active"
                                            ? "status-active"
                                            : "status-inactive"
                                    }
                                >
                                    {course.status}
                                </span>
                            </td>

                            <td className="table-td">
                                {formatDate(
                                    course.createdAt
                                )}
                            </td>

                            <td className="table-td">
                                <div className="flex gap-3">
                                    <button
                                        onClick={() =>
                                            onEdit(course._id)
                                        }
                                    >
                                        <FiEdit />
                                    </button>



                                    <button
                                        onClick={() =>
                                            onDelete(
                                                course._id
                                            )
                                        }
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseTable;