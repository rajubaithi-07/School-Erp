import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// =====================================================
// LAYOUTS
// =====================================================

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import FacultyLayout from "../layouts/FacultyLayout";
import ParentLayout from "../layouts/ParentLayout";
import StudentLayout from "../layouts/StudentLayout";

// =====================================================
// LANDING / LOGIN
// =====================================================

import LandingPage from "../pages/Landing/LandingPage";

import LoginPage from "../pages/Login/LoginPage";
import AdminLogin from "../pages/Login/AdminLogin";
import FacultyLogin from "../pages/Login/FacultyLogin";
import ParentLogin from "../pages/Login/ParentLogin";
import StudentLogin from "../pages/Login/studentLogin";

// =====================================================
// ADMIN PAGES
// =====================================================

import AdminDashboard from "../pages/Admin/Dashboard";

import Students from "../pages/Student/Students";
import AddStudent from "../pages/Student/AddStudent";

import Teachers from "../pages/Teacher/Teachers";

import Parents from "../pages/Parent/Parents";

import Attendance from "../pages/Attendance/Attendance";

import Performance from "../pages/Performance/Performance";

import Fees from "../pages/Fees/Fees";

import Examinations from "../pages/Examination/Examinations";

import Activities from "../pages/Activities/Activities";

import Announcements from "../pages/Announcements/Announcements";

import Reports from "../pages/Reports/Reports";

import Settings from "../pages/Settings/Settings";

// =====================================================
// STUDENT
// =====================================================

import StudentDashboard from "../pages/Student/StudentDashboard";

// =====================================================
// FACULTY
// =====================================================

import FacultyDashboard from "../pages/Faculty/FacultyDashboard";

// =====================================================
// PARENT
// =====================================================

import ParentDashboard from "../pages/Parent/ParentDashboard";

// =====================================================
// APP ROUTES
// =====================================================

function AppRoutes() {
  return (
    <Routes>

      {/* =================================================
          HOME
      ================================================= */}

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<LandingPage />}
        />

      </Route>


      {/* =================================================
          LOGIN
      ================================================= */}

      <Route element={<AuthLayout />}>

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/login/admin"
          element={<AdminLogin />}
        />

        <Route
          path="/login/faculty"
          element={<FacultyLogin />}
        />

        <Route
          path="/login/parent"
          element={<ParentLogin />}
        />

        <Route
          path="/login/student"
          element={<StudentLogin />}
        />

      </Route>


      {/* =================================================
          ADMIN PORTAL
      ================================================= */}

      <Route
        path="/admin"
        element={<DashboardLayout />}
      >

        {/* /admin → /admin/dashboard */}

        <Route
          index
          element={
            <Navigate
              to="/admin/dashboard"
              replace
            />
          }
        />

        {/* =================================================
            DASHBOARD
        ================================================= */}

        <Route
          path="dashboard"
          element={<AdminDashboard />}
        />

        {/* =================================================
            STUDENTS
        ================================================= */}

        <Route
          path="students"
          element={<Students />}
        />

        <Route
          path="students/add"
          element={<AddStudent />}
        />

        {/* =================================================
            TEACHERS
        ================================================= */}

        <Route
          path="teachers"
          element={<Teachers />}
        />

        {/* =================================================
            PARENTS
        ================================================= */}

        <Route
          path="parents"
          element={<Parents />}
        />

        {/* =================================================
            ATTENDANCE
        ================================================= */}

        <Route
          path="attendance"
          element={<Attendance />}
        />

        {/* =================================================
            PERFORMANCE
        ================================================= */}

        <Route
          path="performance"
          element={<Performance />}
        />

        {/* =================================================
            FEES
        ================================================= */}

        <Route
          path="fees"
          element={<Fees />}
        />

        {/* =================================================
            EXAMS
        ================================================= */}

        <Route
          path="exams"
          element={<Examinations />}
        />

        {/* =================================================
            ACTIVITIES
        ================================================= */}

        <Route
          path="activities"
          element={<Activities />}
        />

        {/* =================================================
            ANNOUNCEMENTS
        ================================================= */}

        <Route
          path="announcements"
          element={<Announcements />}
        />

        {/* =================================================
            REPORTS
        ================================================= */}

        <Route
          path="reports"
          element={<Reports />}
        />

        {/* =================================================
            SETTINGS
        ================================================= */}

        <Route
          path="settings"
          element={<Settings />}
        />

      </Route>


      {/* =================================================
          FACULTY PORTAL
      ================================================= */}

      <Route
        path="/faculty"
        element={<FacultyLayout />}
      >

        <Route
          index
          element={
            <Navigate
              to="/faculty/dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={<FacultyDashboard />}
        />

        <Route
          path="students"
          element={<Students />}
        />

        <Route
          path="attendance"
          element={<Attendance />}
        />

        <Route
          path="performance"
          element={<Performance />}
        />

        <Route
          path="examinations"
          element={<Examinations />}
        />

        <Route
          path="activities"
          element={<Activities />}
        />

      </Route>


      {/* =================================================
          PARENT PORTAL
      ================================================= */}

      <Route
        path="/parent"
        element={<ParentLayout />}
      >

        <Route
          index
          element={
            <Navigate
              to="/parent/dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={<ParentDashboard />}
        />

        <Route
          path="my-child"
          element={<Students />}
        />

        <Route
          path="attendance"
          element={<Attendance />}
        />

        <Route
          path="performance"
          element={<Performance />}
        />

        <Route
          path="examinations"
          element={<Examinations />}
        />

        <Route
          path="fees"
          element={<Fees />}
        />

        <Route
          path="activities"
          element={<Activities />}
        />

        <Route
          path="announcements"
          element={<Announcements />}
        />

      </Route>


      {/* =================================================
          STUDENT PORTAL
      ================================================= */}

      <Route
        path="/student"
        element={<StudentLayout />}
      >

        <Route
          index
          element={
            <Navigate
              to="/student/dashboard"
              replace
            />
          }
        />

        <Route
          path="dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="attendance"
          element={<Attendance />}
        />

        <Route
          path="performance"
          element={<Performance />}
        />

        <Route
          path="examinations"
          element={<Examinations />}
        />

        <Route
          path="activities"
          element={<Activities />}
        />

        <Route
          path="announcements"
          element={<Announcements />}
        />

        <Route
          path="fees"
          element={<Fees />}
        />

      </Route>


      {/* =================================================
          UNKNOWN URL
          SEND USER TO HOME
      ================================================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}

export default AppRoutes;