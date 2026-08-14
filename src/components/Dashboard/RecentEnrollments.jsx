import React from "react";
import EmptyState from "../Common/EmptyState";
import { formatDate } from "../../utils/helpers";

const RecentEnrollments = ({
  enrollments = [],
}) => {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">
        Recent Enrollments
      </h3>

      {enrollments.length === 0 ? (
        <EmptyState
          title="No Enrollments"
          description="No recent enrollments found."
        />
      ) : (
        <div className="table-wrapper">
          <table className="common-table">
            <thead className="table-header">
              <tr>
                <th className="table-th">
                  Student
                </th>

                <th className="table-th">
                  Course
                </th>

                <th className="table-th">
                  Status
                </th>

                <th className="table-th">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {enrollments.map(
                (item) => (
                  <tr
                    key={item._id}
                    className="table-row"
                  >
                    <td className="table-td">
                      {
                        item.studentId
                          ?.name
                      }
                    </td>

                    <td className="table-td">
                      {
                        item.courseId
                          ?.title
                      }
                    </td>

                    <td className="table-td">
                      <span
                        className={
                          item.status ===
                          "Completed"
                            ? "status-completed"
                            : "status-progress"
                        }
                      >
                        {
                          item.status
                        }
                      </span>
                    </td>

                    <td className="table-td">
                      {formatDate(
                        item.createdAt
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecentEnrollments;