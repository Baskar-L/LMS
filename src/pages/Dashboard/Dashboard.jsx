import React, {
  useEffect,
  useState,
} from "react";

import {
  FiBookOpen,
  FiUsers,
  FiClipboard,
  FiCheckCircle,
} from "react-icons/fi";

import AppLayout from "../../components/Layout/AppLayout";

import Loader from "../../components/Layout/Loader";

import StatsCard from "../../components/Dashboard/StatsCard";

import RecentEnrollments from "../../components/Dashboard/RecentEnrollments";

import EnrollmentChart from "../../components/Dashboard/EnrollmentChart";

import { getDashboard } from "../../api/dashboardApi";

const Dashboard = () => {
  const [loading, setLoading] =
    useState(true);

  const [dashboard, setDashboard] =
    useState(null);

  const fetchDashboard =
    async () => {
      try {
        const response =
          await getDashboard();

        setDashboard(
          response.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading)
    return <Loader />;

  const stats =
    dashboard?.stats || {};

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="page-title">
            Dashboard
          </h1>

          <p className="page-subtitle">
            LMS Overview
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5">
          <StatsCard
            title="Courses"
            value={
              stats.totalCourses
            }
            icon={
              <FiBookOpen />
            }
          />

          <StatsCard
            title="Students"
            value={
              stats.totalStudents
            }
            icon={
              <FiUsers />
            }
          />

          <StatsCard
            title="Enrollments"
            value={
              stats.totalEnrollments
            }
            icon={
              <FiClipboard />
            }
          />

          <StatsCard
            title="Completed"
            value={
              stats.completed
            }
            icon={
              <FiCheckCircle />
            }
          />

          <StatsCard
            title="In Progress"
            value={
              stats.inProgress
            }
            icon={
              <FiClipboard />
            }
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          <EnrollmentChart
            completed={
              stats.completed
            }
            inProgress={
              stats.inProgress
            }
          />

          <RecentEnrollments
            enrollments={
              dashboard?.recentEnrollments ||
              []
            }
          />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;