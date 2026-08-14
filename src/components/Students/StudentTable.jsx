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

                <td className="table-td">
                  <div className="flex gap-3">
                    <Link
                      to={`/students/${student._id}`}
                    >
                      <FiEye />
                    </Link>

                    <Link
                      to={`/students/edit/${student._id}`}
                    >
                      <FiEdit />
                    </Link>

                    <button
                      onClick={() =>
                        onDelete(
                          student._id
                        )
                      }
                    >
                      <FiTrash2 />
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

export default StudentTable;