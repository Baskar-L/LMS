import {
  formatDate,
} from "../../utils/helpers";

const CourseDetails = ({
  course,
}) => {
  return (
    <div className="page-container">
      <h2 className="text-xl font-bold">
        {course.title}
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mt-5">
        <div>
          <strong>
            Instructor:
          </strong>

          <p>
            {
              course.instructorName
            }
          </p>
        </div>

        <div>
          <strong>
            Category:
          </strong>

          <p>
            {course.category}
          </p>
        </div>

        <div>
          <strong>
            Duration:
          </strong>

          <p>
            {course.duration}
          </p>
        </div>

        <div>
          <strong>
            Status:
          </strong>

          <p>{course.status}</p>
        </div>

        <div>
          <strong>
            Created:
          </strong>

          <p>
            {formatDate(
              course.createdAt
            )}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <strong>
          Description
        </strong>

        <p className="mt-2 text-gray-600">
          {course.description}
        </p>
      </div>
    </div>
  );
};

export default CourseDetails;