import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import AppLayout from "../../components/Layout/AppLayout";
import Loader from "../../components/Layout/Loader";
import CourseDetails from "../../components/Courses/CourseDetails";

import { getCourseById } from "../../api/courseApi";

const CourseView = () => {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCourse = async () => {
    try {
      const response = await getCourseById(id);

      setCourse(response.data);
    } catch (error) {
      console.error("Failed to fetch course:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <AppLayout>
        <Loader />
      </AppLayout>
    );
  }

  if (!course) {
    return (
      <AppLayout>
        <div className="page-container">
          <h2 className="text-xl font-semibold text-red-600">
            Course not found
          </h2>

          <Link
            to="/courses"
            className="primary-btn mt-4"
          >
            Back to Courses
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-4 flex justify-between items-center">
        <h1 className="page-title">
          Course Details
        </h1>

        <Link
          to="/courses"
          className="primary-btn"
        >
          Back
        </Link>
      </div>

      <CourseDetails course={course} />
    </AppLayout>
  );
};

export default CourseView;