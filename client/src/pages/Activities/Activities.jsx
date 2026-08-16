import { useEffect, useMemo, useState } from "react";
import "../../styles/activities.css";

const API_URL = "http://localhost:5000/api/activities";

const emptyForm = {
  activityName: "",
  description: "",
  type: "Celebration",
  date: "",
  time: "",
  location: "",
  coordinator: "",
  status: "Planned",
};

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    ...emptyForm,
  });

  // =====================================================
  // ADMIN CHECK
  // =====================================================
  // Only URLs under /admin are allowed to add/edit/delete.
  // Faculty, Parent and Student can only view.

  const isAdmin =
    window.location.pathname.startsWith("/admin");

  // =====================================================
  // LOAD ACTIVITIES
  // =====================================================

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to load activities");
      }

      const result = await response.json();

      const activityList =
        result.activities ||
        result.data ||
        result.results ||
        [];

      setActivities(
        Array.isArray(activityList)
          ? activityList
          : []
      );
    } catch (err) {
      console.error(
        "Activity API Error:",
        err
      );

      setError(
        "Unable to load activities. Please check that the server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredActivities = useMemo(() => {
    const value =
      search.toLowerCase().trim();

    if (!value) {
      return activities;
    }

    return activities.filter((activity) => {
      return (
        String(
          activity.activityName || ""
        )
          .toLowerCase()
          .includes(value) ||
        String(
          activity.description || ""
        )
          .toLowerCase()
          .includes(value) ||
        String(
          activity.type || ""
        )
          .toLowerCase()
          .includes(value) ||
        String(
          activity.location || ""
        )
          .toLowerCase()
          .includes(value) ||
        String(
          activity.coordinator || ""
        )
          .toLowerCase()
          .includes(value)
      );
    });
  }, [activities, search]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalActivities =
    activities.length;

  const plannedActivities =
    activities.filter(
      (activity) =>
        String(activity.status)
          .toLowerCase() === "planned"
    ).length;

  const ongoingActivities =
    activities.filter(
      (activity) =>
        String(activity.status)
          .toLowerCase() === "ongoing"
    ).length;

  const completedActivities =
    activities.filter(
      (activity) =>
        String(activity.status)
          .toLowerCase() === "completed"
    ).length;

  // =====================================================
  // INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {
    const { name, value } =
      e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // OPEN ADD MODAL
  // ADMIN ONLY
  // =====================================================

  const openAddModal = () => {
    if (!isAdmin) {
      return;
    }

    setEditingId(null);

    setForm({
      ...emptyForm,
    });

    setShowModal(true);
  };

  // =====================================================
  // OPEN EDIT MODAL
  // ADMIN ONLY
  // =====================================================

  const openEditModal = (activity) => {
    if (!isAdmin) {
      return;
    }

    setEditingId(
      activity._id ||
        activity.id
    );

    setForm({
      activityName:
        activity.activityName ||
        activity.name ||
        "",

      description:
        activity.description ||
        "",

      type:
        activity.type ||
        "Celebration",

      date: activity.date
        ? String(
            activity.date
          ).substring(0, 10)
        : "",

      time:
        activity.time ||
        "",

      location:
        activity.location ||
        "",

      coordinator:
        activity.coordinator ||
        "",

      status:
        activity.status ||
        "Planned",
    });

    setShowModal(true);
  };

  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (saving) {
      return;
    }

    setShowModal(false);
    setEditingId(null);

    setForm({
      ...emptyForm,
    });
  };

  // =====================================================
  // SAVE ACTIVITY
  // ADMIN ONLY
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      return;
    }

    if (
      !form.activityName.trim()
    ) {
      alert(
        "Please enter activity name."
      );
      return;
    }

    if (!form.description.trim()) {
      alert(
        "Please enter description."
      );
      return;
    }

    if (!form.date) {
      alert(
        "Please select activity date."
      );
      return;
    }

    if (!form.time) {
      alert(
        "Please enter activity time."
      );
      return;
    }

    if (!form.location.trim()) {
      alert(
        "Please enter location."
      );
      return;
    }

    if (
      !form.coordinator.trim()
    ) {
      alert(
        "Please enter coordinator name."
      );
      return;
    }

    try {
      setSaving(true);

      const method = editingId
        ? "PUT"
        : "POST";

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const requestBody = {
        activityName:
          form.activityName.trim(),

        description:
          form.description.trim(),

        type:
          form.type,

        date:
          form.date,

        time:
          form.time,

        location:
          form.location.trim(),

        coordinator:
          form.coordinator.trim(),

        status:
          form.status,
      };

      const response =
        await fetch(url, {
          method,

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            requestBody
          ),
        });

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to save activity"
        );
      }

      alert(
        editingId
          ? "Activity updated successfully!"
          : "Activity added successfully!"
      );

      setShowModal(false);
      setEditingId(null);

      setForm({
        ...emptyForm,
      });

      await loadActivities();
    } catch (err) {
      console.error(
        "Save Activity Error:",
        err
      );

      alert(
        err.message ||
          "Something went wrong while saving activity."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE ACTIVITY
  // ADMIN ONLY
  // =====================================================

  const handleDelete = async (
    activity
  ) => {
    if (!isAdmin) {
      return;
    }

    const id =
      activity._id ||
      activity.id;

    if (!id) {
      alert(
        "Activity ID not found."
      );
      return;
    }

    const activityName =
      activity.activityName ||
      activity.name ||
      "this activity";

    const confirmed =
      window.confirm(
        `Are you sure you want to delete ${activityName}?`
      );

    if (!confirmed) {
      return;
    }

    try {
      const response =
        await fetch(
          `${API_URL}/${id}`,
          {
            method: "DELETE",
          }
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to delete activity"
        );
      }

      alert(
        "Activity deleted successfully."
      );

      await loadActivities();
    } catch (err) {
      console.error(
        "Delete Activity Error:",
        err
      );

      alert(
        err.message ||
          "Unable to delete activity."
      );
    }
  };

  // =====================================================
  // VIEW ACTIVITY
  // =====================================================

  const handleView = (activity) => {
    const activityName =
      activity.activityName ||
      activity.name ||
      "-";

    alert(
      `Activity Details\n\n` +
        `Activity: ${activityName}\n` +
        `Type: ${
          activity.type || "-"
        }\n` +
        `Date: ${
          activity.date || "-"
        }\n` +
        `Time: ${
          activity.time || "-"
        }\n` +
        `Location: ${
          activity.location || "-"
        }\n` +
        `Coordinator: ${
          activity.coordinator || "-"
        }\n` +
        `Status: ${
          activity.status || "-"
        }\n` +
        `Description: ${
          activity.description || "-"
        }`
    );
  };

  // =====================================================
  // STATUS CLASS
  // =====================================================

  const getStatusClass = (
    status
  ) => {
    const value =
      String(status || "")
        .toLowerCase();

    if (value === "completed") {
      return "completed";
    }

    if (value === "ongoing") {
      return "ongoing";
    }

    if (value === "cancelled") {
      return "cancelled";
    }

    return "planned";
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) {
      return "-";
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
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div className="activities-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="activities-header">

        <div>
          <div className="activities-label">
            SCHOOL ACTIVITIES
          </div>

          <h1>
            Activities
          </h1>

          <p>
            View school activities,
            events and programs.
          </p>
        </div>

        {/* ===============================================
            ADMIN ONLY
        =============================================== */}

        {isAdmin && (
          <button
            className="add-activity-btn"
            onClick={openAddModal}
          >
            <span>+</span>
            Add Activity
          </button>
        )}

      </div>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <div className="activity-stat-grid">

        <div className="activity-stat-card">

          <div className="activity-stat-icon">
            📅
          </div>

          <div className="activity-stat-info">

            <span>
              Total Activities
            </span>

            <strong>
              {totalActivities}
            </strong>

            <small>
              All school activities
            </small>

          </div>

        </div>

        <div className="activity-stat-card">

          <div className="activity-stat-icon">
            📋
          </div>

          <div className="activity-stat-info">

            <span>
              Planned
            </span>

            <strong>
              {plannedActivities}
            </strong>

            <small>
              Upcoming activities
            </small>

          </div>

        </div>

        <div className="activity-stat-card">

          <div className="activity-stat-icon">
            🔄
          </div>

          <div className="activity-stat-info">

            <span>
              Ongoing
            </span>

            <strong>
              {ongoingActivities}
            </strong>

            <small>
              Currently running
            </small>

          </div>

        </div>

        <div className="activity-stat-card">

          <div className="activity-stat-icon">
            ✓
          </div>

          <div className="activity-stat-info">

            <span>
              Completed
            </span>

            <strong>
              {completedActivities}
            </strong>

            <small>
              Completed activities
            </small>

          </div>

        </div>

      </div>

      {/* =================================================
          ACTIVITY RECORDS
      ================================================= */}

      <div className="activity-records">

        <div className="records-header">

          <div>

            <h2>
              Activity Records
            </h2>

            <p>
              View upcoming and
              previous school activities.
            </p>

          </div>

          <div className="activity-search">

            <span>
              🔍
            </span>

            <input
              type="text"
              placeholder="Search activities..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div className="activity-state">

            <div className="loading-spinner"></div>

            <h3>
              Loading Activities...
            </h3>

            <p>
              Please wait while we fetch
              activity records.
            </p>

          </div>
        )}

        {/* =================================================
            ERROR
        ================================================= */}

        {!loading &&
          error && (
            <div className="activity-state">

              <div className="state-icon">
                ⚠️
              </div>

              <h3>
                Unable to Load Activities
              </h3>

              <p>
                {error}
              </p>

              <button
                className="retry-btn"
                onClick={
                  loadActivities
                }
              >
                Retry
              </button>

            </div>
          )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading &&
          !error &&
          filteredActivities.length ===
            0 && (
            <div className="activity-state">

              <div className="empty-activity-icon">
                📅
              </div>

              <h3>
                No Activity Records Found
              </h3>

              <p>
                {search
                  ? "No activities match your search."
                  : "There are no activities yet."}
              </p>

              {/* ADMIN ONLY */}

              {isAdmin &&
                !search && (
                  <button
                    className="add-first-btn"
                    onClick={
                      openAddModal
                    }
                  >
                    + Add First Activity
                  </button>
                )}

            </div>
          )}

        {/* =================================================
            TABLE
        ================================================= */}

        {!loading &&
          !error &&
          filteredActivities.length >
            0 && (
            <div className="activity-table-wrapper">

              <table className="activity-table">

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
                      TIME
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

                    <th>
                      ACTIONS
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredActivities.map(
                    (
                      activity,
                      index
                    ) => {

                      const id =
                        activity._id ||
                        activity.id ||
                        index;

                      const activityName =
                        activity.activityName ||
                        activity.name ||
                        "Unnamed Activity";

                      return (
                        <tr
                          key={id}
                        >

                          {/* ACTIVITY */}

                          <td>

                            <div className="activity-profile">

                              <div className="activity-avatar">
                                📅
                              </div>

                              <div>

                                <strong>
                                  {
                                    activityName
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

                          {/* TYPE */}

                          <td>

                            <span className="activity-type-badge">
                              {
                                activity.type ||
                                "-"
                              }
                            </span>

                          </td>

                          {/* DATE */}

                          <td>
                            {formatDate(
                              activity.date
                            )}
                          </td>

                          {/* TIME */}

                          <td>
                            {
                              activity.time ||
                              "-"
                            }
                          </td>

                          {/* LOCATION */}

                          <td>
                            {
                              activity.location ||
                              "-"
                            }
                          </td>

                          {/* COORDINATOR */}

                          <td>
                            {
                              activity.coordinator ||
                              "-"
                            }
                          </td>

                          {/* STATUS */}

                          <td>

                            <span
                              className={`activity-status-badge ${getStatusClass(
                                activity.status
                              )}`}
                            >
                              {
                                activity.status ||
                                "Planned"
                              }
                            </span>

                          </td>

                          {/* ACTIONS */}

                          <td>

                            <div className="activity-actions">

                              {/* VIEW - EVERYONE */}

                              <button
                                className="view-btn"
                                onClick={() =>
                                  handleView(
                                    activity
                                  )
                                }
                              >
                                View
                              </button>

                              {/* =================================
                                  ADMIN ONLY
                              ================================= */}

                              {isAdmin && (
                                <>
                                  <button
                                    className="edit-btn"
                                    onClick={() =>
                                      openEditModal(
                                        activity
                                      )
                                    }
                                  >
                                    Edit
                                  </button>

                                  <button
                                    className="delete-btn"
                                    onClick={() =>
                                      handleDelete(
                                        activity
                                      )
                                    }
                                  >
                                    Delete
                                  </button>
                                </>
                              )}

                            </div>

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

      {/* =================================================
          ADD / EDIT MODAL
          ADMIN ONLY
      ================================================= */}

      {isAdmin &&
        showModal && (
          <div
            className="activity-modal-overlay"
            onClick={closeModal}
          >

            <div
              className="activity-modal"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              {/* HEADER */}

              <div className="modal-header">

                <div>

                  <h2>
                    {editingId
                      ? "Edit Activity"
                      : "Add Activity"}
                  </h2>

                  <p>
                    {editingId
                      ? "Update activity information."
                      : "Enter activity information to create a new activity."}
                  </p>

                </div>

                <button
                  className="modal-close"
                  onClick={
                    closeModal
                  }
                  disabled={saving}
                  type="button"
                >
                  ×
                </button>

              </div>

              {/* FORM */}

              <form
                className="activity-form"
                onSubmit={
                  handleSubmit
                }
              >

                <div className="form-section-title">
                  Activity Information
                </div>

                <div className="form-grid">

                  {/* ACTIVITY NAME */}

                  <div className="form-group">

                    <label>
                      Activity Name *
                    </label>

                    <input
                      name="activityName"
                      value={
                        form.activityName
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter activity name"
                      required
                    />

                  </div>

                  {/* TYPE */}

                  <div className="form-group">

                    <label>
                      Type *
                    </label>

                    <select
                      name="type"
                      value={
                        form.type
                      }
                      onChange={
                        handleChange
                      }
                    >

                      <option value="Celebration">
                        Celebration
                      </option>

                      <option value="Sports">
                        Sports
                      </option>

                      <option value="Academic">
                        Academic
                      </option>

                      <option value="Cultural">
                        Cultural
                      </option>

                      <option value="Workshop">
                        Workshop
                      </option>

                      <option value="Meeting">
                        Meeting
                      </option>

                      <option value="Other">
                        Other
                      </option>

                    </select>

                  </div>

                  {/* DATE */}

                  <div className="form-group">

                    <label>
                      Date *
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={
                        form.date
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                  {/* TIME */}

                  <div className="form-group">

                    <label>
                      Time *
                    </label>

                    <input
                      type="time"
                      name="time"
                      value={
                        form.time
                      }
                      onChange={
                        handleChange
                      }
                      required
                    />

                  </div>

                  {/* LOCATION */}

                  <div className="form-group">

                    <label>
                      Location *
                    </label>

                    <input
                      name="location"
                      value={
                        form.location
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter location"
                      required
                    />

                  </div>

                  {/* COORDINATOR */}

                  <div className="form-group">

                    <label>
                      Coordinator *
                    </label>

                    <input
                      name="coordinator"
                      value={
                        form.coordinator
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter coordinator name"
                      required
                    />

                  </div>

                  {/* STATUS */}

                  <div className="form-group">

                    <label>
                      Status
                    </label>

                    <select
                      name="status"
                      value={
                        form.status
                      }
                      onChange={
                        handleChange
                      }
                    >

                      <option value="Planned">
                        Planned
                      </option>

                      <option value="Ongoing">
                        Ongoing
                      </option>

                      <option value="Completed">
                        Completed
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </div>

                </div>

                {/* DESCRIPTION */}

                <div className="form-section-title">
                  Additional Information
                </div>

                <div className="form-grid">

                  <div className="form-group full-width">

                    <label>
                      Description *
                    </label>

                    <textarea
                      name="description"
                      value={
                        form.description
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Enter activity description"
                      rows="4"
                      required
                    />

                  </div>

                </div>

                {/* FORM ACTIONS */}

                <div className="form-actions">

                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={
                      closeModal
                    }
                    disabled={saving}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="save-activity-btn"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving..."
                      : editingId
                      ? "Update Activity"
                      : "Add Activity"}
                  </button>

                </div>

              </form>

            </div>

          </div>
        )}

    </div>
  );
}

export default Activities;