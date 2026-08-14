import {
  formatDate,
} from "../../utils/helpers";

const StudentDetails = ({
  student,
}) => {
  return (
    <div className="page-container">
      <h2 className="text-2xl font-bold">
        {student.name}
      </h2>

      <div className="grid md:grid-cols-2 gap-5 mt-5">
        <div>
          <strong>Email</strong>

          <p>
            {student.email}
          </p>
        </div>

        <div>
          <strong>
            Registered On
          </strong>

          <p>
            {formatDate(
              student.createdAt
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;