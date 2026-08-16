import { useEffect, useMemo, useState } from "react";
import "../../styles/reports.css";

const DASHBOARD_API = "http://localhost:5000/api/dashboard";
const ACTIVITIES_API = "http://localhost:5000/api/activities";

function Reports() {
  const [dashboard, setDashboard] = useState({
    students: 0,
    teachers: 0,
    parents: 0,
    attendance: 0,
    performance: 0,
    fees: 0,
    examinations: 0,
    courses: 0,
  });

  const [activities, setActivities] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD REPORT DATA
  // =====================================================

  const loadReports = async () => {
    try {
      setLoading(true);
      setError("");

      const [dashboardResponse, activitiesResponse] =
        await Promise.all([
          fetch(DASHBOARD_API),
          fetch(ACTIVITIES_API),
        ]);

      if (!dashboardResponse.ok) {
        throw new Error("Unable to load dashboard report");
      }

      if (!activitiesResponse.ok) {
        throw new Error("Unable to load activity report");
      }

      const dashboardResult =
        await dashboardResponse.json();

      const activitiesResult =
        await activitiesResponse.json();

      // ---------------------------------------------------
      // DASHBOARD DATA
      // ---------------------------------------------------

      setDashboard({
        students:
          Number(dashboardResult.students) || 0,

        teachers:
          Number(dashboardResult.teachers) || 0,

        parents:
          Number(dashboardResult.parents) || 0,

        attendance:
          Number(dashboardResult.attendance) || 0,

        performance:
          Number(dashboardResult.performance) || 0,

        fees:
          Number(dashboardResult.fees) || 0,

        examinations:
          Number(dashboardResult.examinations) || 0,

        courses:
          Number(dashboardResult.courses) || 0,
      });

      // ---------------------------------------------------
      // ACTIVITY DATA
      // ---------------------------------------------------

      const activityList =
        activitiesResult.activities ||
        activitiesResult.data ||
        [];

      setActivities(
        Array.isArray(activityList)
          ? activityList
          : []
      );
    } catch (err) {
      console.error(
        "Reports API Error:",
        err
      );

      setError(
        "Unable to load reports. Please make sure the server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  // =====================================================
  // ACTIVITY STATISTICS
  // =====================================================

  const activityStats = useMemo(() => {
    return {
      total: activities.length,

      planned: activities.filter(
        (activity) =>
          activity.status === "Planned"
      ).length,

      upcoming: activities.filter(
        (activity) =>
          activity.status === "Upcoming"
      ).length,

      ongoing: activities.filter(
        (activity) =>
          activity.status === "Ongoing"
      ).length,

      completed: activities.filter(
        (activity) =>
          activity.status === "Completed"
      ).length,

      cancelled: activities.filter(
        (activity) =>
          activity.status === "Cancelled"
      ).length,
    };
  }, [activities]);

  // =====================================================
  // TOTAL RECORDS
  // =====================================================

  const totalRecords =
    dashboard.students +
    dashboard.teachers +
    dashboard.parents +
    dashboard.courses +
    dashboard.attendance +
    dashboard.performance +
    dashboard.fees +
    dashboard.examinations;

  // =====================================================
  // PRINT REPORT
  // =====================================================

  const handlePrint = () => {
    window.print();
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    // Handles DD-MM-YYYY format
    if (
      typeof date === "string" &&
      /^\d{2}-\d{2}-\d{4}$/.test(date)
    ) {
      const [day, month, year] =
        date.split("-");

      const parsedDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
      );

      return parsedDate.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return date;
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "completed";

      case "Planned":
        return "planned";

      case "Upcoming":
        return "planned";

      case "Ongoing":
        return "ongoing";

      case "Cancelled":
        return "cancelled";

      default:
        return "default";
    }
  };

  // =====================================================
  // REPORT CARDS
  // =====================================================

  const reportCards = [
    {
      title: "Students",
      value: dashboard.students,
      description: "Registered students",
      icon: "🎓",
      className: "students",
    },

    {
      title: "Teachers",
      value: dashboard.teachers,
      description: "Registered teachers",
      icon: "👨‍🏫",
      className: "teachers",
    },

    {
      title: "Parents",
      value: dashboard.parents,
      description: "Registered parents",
      icon: "👨‍👩‍👧",
      className: "parents",
    },

    {
      title: "Courses",
      value: dashboard.courses,
      description: "Academic courses",
      icon: "📚",
      className: "courses",
    },

    {
      title: "Attendance",
      value: dashboard.attendance,
      description: "Attendance records",
      icon: "📅",
      className: "attendance",
    },

    {
      title: "Performance",
      value: dashboard.performance,
      description: "Performance records",
      icon: "📈",
      className: "performance",
    },

    {
      title: "Fees",
      value: dashboard.fees,
      description: "Fee records",
      icon: "💰",
      className: "fees",
    },

    {
      title: "Examinations",
      value: dashboard.examinations,
      description: "Examination records",
      icon: "📝",
      className: "examinations",
    },
  ];

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="reports-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="reports-header">

        <div>
          <div className="reports-label">
            SCHOOL ERP
          </div>

          <h1>
            Reports
          </h1>

          <p>
            View and analyze school ERP
            records and activity summaries.
          </p>
        </div>

        <button
          className="print-report-btn"
          onClick={handlePrint}
        >
          🖨️ Print Report
        </button>

      </div>

      {/* =================================================
          ERROR
      ================================================= */}

      {error && (
        <div className="report-error">

          <span className="error-icon">
            ⚠️
          </span>

          <div>
            <strong>
              Unable to Load Reports
            </strong>

            <p>
              {error}
            </p>
          </div>

          <button
            onClick={loadReports}
          >
            Retry
          </button>

        </div>
      )}

      {/* =================================================
          LOADING
      ================================================= */}

      {loading ? (
        <div className="report-loading">

          <div className="report-spinner"></div>

          <h3>
            Loading Reports...
          </h3>

          <p>
            Please wait while we collect
            school ERP statistics.
          </p>

        </div>
      ) : (
        <>

          {/* =============================================
              OVERVIEW
          ============================================= */}

          <div className="report-overview">

            <div className="overview-card">

              <div className="overview-icon">
                📊
              </div>

              <div>
                <span>
                  Total Records
                </span>

                <strong>
                  {totalRecords}
                </strong>

                <small>
                  Across all ERP modules
                </small>
              </div>

            </div>

            <div className="overview-card">

              <div className="overview-icon">
                🎯
              </div>

              <div>
                <span>
                  Total Activities
                </span>

                <strong>
                  {activityStats.total}
                </strong>

                <small>
                  School activities
                </small>
              </div>

            </div>

            <div className="overview-card">

              <div className="overview-icon">
                ✅
              </div>

              <div>
                <span>
                  Completed Activities
                </span>

                <strong>
                  {activityStats.completed}
                </strong>

                <small>
                  Successfully completed
                </small>
              </div>

            </div>

            <div className="overview-card">

              <div className="overview-icon">
                📅
              </div>

              <div>
                <span>
                  Upcoming Activities
                </span>

                <strong>
                  {
                    activityStats.planned +
                    activityStats.upcoming
                  }
                </strong>

                <small>
                  Planned and upcoming
                </small>
              </div>

            </div>

          </div>

          {/* =============================================
              MODULE REPORTS
          ============================================= */}

          <div className="reports-section">

            <div className="section-heading">

              <div>
                <h2>
                  Module Reports
                </h2>

                <p>
                  Summary of records available
                  across the School ERP.
                </p>
              </div>

            </div>

            <div className="report-card-grid">

              {reportCards.map(
                (card) => (
                  <div
                    className="module-report-card"
                    key={card.title}
                  >

                    <div
                      className={`module-report-icon ${card.className}`}
                    >
                      {card.icon}
                    </div>

                    <div className="module-report-content">

                      <span>
                        {card.title}
                      </span>

                      <strong>
                        {card.value}
                      </strong>

                      <small>
                        {card.description}
                      </small>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

          {/* =============================================
              ACTIVITY SUMMARY
          ============================================= */}

          <div className="reports-section">

            <div className="section-heading">

              <div>
                <h2>
                  Activity Summary
                </h2>

                <p>
                  Current status of school
                  activities.
                </p>
              </div>

            </div>

            <div className="activity-summary-grid">

              <div className="activity-summary-card planned-card">

                <span className="summary-number">
                  {activityStats.planned}
                </span>

                <span className="summary-title">
                  Planned
                </span>

              </div>

              <div className="activity-summary-card ongoing-card">

                <span className="summary-number">
                  {activityStats.ongoing}
                </span>

                <span className="summary-title">
                  Ongoing
                </span>

              </div>

              <div className="activity-summary-card completed-card">

                <span className="summary-number">
                  {activityStats.completed}
                </span>

                <span className="summary-title">
                  Completed
                </span>

              </div>

              <div className="activity-summary-card cancelled-card">

                <span className="summary-number">
                  {activityStats.cancelled}
                </span>

                <span className="summary-title">
                  Cancelled
                </span>

              </div>

            </div>

          </div>

          {/* =============================================
              RECENT ACTIVITIES
          ============================================= */}

          <div className="reports-section recent-activities-section">

            <div className="section-heading">

              <div>
                <h2>
                  Recent Activities
                </h2>

                <p>
                  Latest registered school
                  activities.
                </p>
              </div>

              <span className="record-count">
                {activities.length} Records
              </span>

            </div>

            {activities.length === 0 ? (
              <div className="no-report-data">

                <div className="no-data-icon">
                  📅
                </div>

                <h3>
                  No Activities Found
                </h3>

                <p>
                  No school activities have
                  been registered yet.
                </p>

              </div>
            ) : (
              <div className="report-table-wrapper">

                <table className="report-table">

                  <thead>

                    <tr>
                      <th>
                        ACTIVITY
                      </th>

                      <th>
                        TYPE
                      </th>

                      <th>
                        DATE
                      </th>

                      <th>
                        LOCATION
                      </th>

                      <th>
                        COORDINATOR
                      </th>

                      <th>
                        STATUS
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {activities
                      .slice(0, 10)
                      .map(
                        (
                          activity,
                          index
                        ) => {

                          const id =
                            activity._id ||
                            activity.id ||
                            index;

                          return (
                            <tr key={id}>

                              <td>

                                <div className="report-activity-name">

                                  <div className="report-activity-icon">
                                    📅
                                  </div>

                                  <div>

                                    <strong>
                                      {
                                        activity.activityName ||
                                        "Unnamed Activity"
                                      }
                                    </strong>

                                    <small>
                                      {
                                        activity.description ||
                                        "No description"
                                      }
                                    </small>

                                  </div>

                                </div>

                              </td>

                              <td>

                                <span className="activity-type-badge">
                                  {
                                    activity.activityType ||
                                    "-"
                                  }
                                </span>

                              </td>

                              <td>
                                {formatDate(
                                  activity.date
                                )}
                              </td>

                              <td>
                                {
                                  activity.location ||
                                  "-"
                                }
                              </td>

                              <td>
                                {
                                  activity.coordinator ||
                                  "-"
                                }
                              </td>

                              <td>

                                <span
                                  className={`report-status ${getStatusClass(
                                    activity.status
                                  )}`}
                                >
                                  {
                                    activity.status ||
                                    "-"
                                  }
                                </span>

                              </td>

                            </tr>
                          );
                        }
                      )}

                  </tbody>

                </table>

              </div>
            )}

          </div>

          {/* =============================================
              REPORT FOOTER
          ============================================= */}

          <div className="report-footer">

            <div>

              <strong>
                School ERP Report
              </strong>

              <p>
                Generated from the current
                School ERP database records.
              </p>

            </div>

            <div className="report-footer-date">
              Generated on{" "}
              {new Date().toLocaleDateString(
                "en-IN",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }
              )}
            </div>

          </div>

        </>
      )}

    </div>
  );
}

export default Reports;