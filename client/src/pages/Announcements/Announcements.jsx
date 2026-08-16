import React, { useState } from "react";

function Announcements() {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Independence Day Holiday",
      message:
        "The school will remain closed on 15 August on the occasion of Independence Day.",
      date: "15 Aug 2026",
      type: "Holiday",
      image: "",
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    title: "",
    message: "",
    date: "",
    type: "Notice",
    image: "",
  });

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =====================================================
  // IMAGE
  // =====================================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((previous) => ({
        ...previous,
        image: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  // =====================================================
  // ADD ANNOUNCEMENT
  // =====================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter announcement title.");
      return;
    }

    if (!form.message.trim()) {
      alert("Please enter announcement message.");
      return;
    }

    const newAnnouncement = {
      id: Date.now(),
      title: form.title,
      message: form.message,
      date: form.date
        ? new Date(form.date).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          )
        : "-",
      type: form.type,
      image: form.image,
    };

    setAnnouncements((previous) => [
      newAnnouncement,
      ...previous,
    ]);

    setForm({
      title: "",
      message: "",
      date: "",
      type: "Notice",
      image: "",
    });

    setShowForm(false);

    alert("Announcement added successfully.");
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this announcement?"
    );

    if (!confirmed) {
      return;
    }

    setAnnouncements((previous) =>
      previous.filter(
        (announcement) =>
          announcement.id !== id
      )
    );
  };

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <div
      style={{
        padding: "5px",
      }}
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          marginBottom: "30px",
        }}
      >

        <div>

          <div
            style={{
              color: "#2563eb",
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "1px",
              marginBottom: "8px",
            }}
          >
            SCHOOL COMMUNICATION
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              color: "#0f172a",
            }}
          >
            Announcements
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#64748b",
            }}
          >
            Publish school holidays, notices,
            celebrations and important updates.
          </p>

        </div>

        <button
          type="button"
          onClick={() =>
            setShowForm(true)
          }
          style={{
            border: "none",
            background: "#2563eb",
            color: "#ffffff",
            padding: "13px 20px",
            borderRadius: "8px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          + New Announcement
        </button>

      </div>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "25px",
        }}
      >

        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "24px",
            border: "1px solid #e2e8f0",
          }}
        >

          <div
            style={{
              fontSize: "14px",
              color: "#64748b",
            }}
          >
            Total Announcements
          </div>

          <strong
            style={{
              display: "block",
              marginTop: "8px",
              fontSize: "30px",
              color: "#2563eb",
            }}
          >
            {announcements.length}
          </strong>

        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "24px",
            border: "1px solid #e2e8f0",
          }}
        >

          <div
            style={{
              fontSize: "14px",
              color: "#64748b",
            }}
          >
            Holidays / Notices
          </div>

          <strong
            style={{
              display: "block",
              marginTop: "8px",
              fontSize: "30px",
              color: "#16a34a",
            }}
          >
            {
              announcements.filter(
                (item) =>
                  item.type === "Holiday" ||
                  item.type === "Notice"
              ).length
            }
          </strong>

        </div>

      </div>

      {/* =================================================
          ANNOUNCEMENT RECORDS
      ================================================= */}

      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >

        <div
          style={{
            padding: "22px 25px",
            borderBottom:
              "1px solid #e2e8f0",
          }}
        >

          <h2
            style={{
              margin: 0,
              color: "#0f172a",
            }}
          >
            School Announcements
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            Important school information for
            students, parents and faculty.
          </p>

        </div>

        {announcements.length === 0 ? (
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
            }}
          >

            <div
              style={{
                fontSize: "45px",
              }}
            >
              📢
            </div>

            <h3>
              No Announcements
            </h3>

            <p
              style={{
                color: "#64748b",
              }}
            >
              No school announcements have
              been created yet.
            </p>

          </div>
        ) : (
          <div>

            {announcements.map(
              (announcement) => (
                <div
                  key={announcement.id}
                  style={{
                    padding: "22px 25px",
                    borderBottom:
                      "1px solid #e2e8f0",
                    display: "flex",
                    gap: "20px",
                    alignItems: "flex-start",
                  }}
                >

                  {/* IMAGE */}

                  <div
                    style={{
                      width: "90px",
                      height: "90px",
                      minWidth: "90px",
                      borderRadius: "12px",
                      background: "#eff6ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      fontSize: "30px",
                    }}
                  >

                    {announcement.image ? (
                      <img
                        src={
                          announcement.image
                        }
                        alt={
                          announcement.title
                        }
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      "📢"
                    )}

                  </div>

                  {/* CONTENT */}

                  <div
                    style={{
                      flex: 1,
                    }}
                  >

                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        gap: "15px",
                      }}
                    >

                      <div>

                        <span
                          style={{
                            display:
                              "inline-block",
                            padding:
                              "5px 10px",
                            borderRadius:
                              "20px",
                            background:
                              "#eff6ff",
                            color:
                              "#2563eb",
                            fontSize:
                              "12px",
                            fontWeight:
                              "700",
                            marginBottom:
                              "8px",
                          }}
                        >
                          {
                            announcement.type
                          }
                        </span>

                        <h3
                          style={{
                            margin:
                              "0 0 7px",
                            color:
                              "#0f172a",
                          }}
                        >
                          {
                            announcement.title
                          }
                        </h3>

                      </div>

                      <span
                        style={{
                          color:
                            "#64748b",
                          fontSize:
                            "13px",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        {
                          announcement.date
                        }
                      </span>

                    </div>

                    <p
                      style={{
                        margin:
                          "5px 0 15px",
                        color:
                          "#475569",
                        lineHeight:
                          "1.6",
                      }}
                    >
                      {
                        announcement.message
                      }
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          announcement.id
                        )
                      }
                      style={{
                        border:
                          "1px solid #fecaca",
                        background:
                          "#fff1f2",
                        color:
                          "#dc2626",
                        padding:
                          "7px 12px",
                        borderRadius:
                          "6px",
                        cursor:
                          "pointer",
                        fontWeight:
                          "600",
                      }}
                    >
                      Delete
                    </button>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>

      {/* =================================================
          ADD ANNOUNCEMENT MODAL
      ================================================= */}

      {showForm && (
        <div
          onClick={() =>
            setShowForm(false)
          }
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(15,23,42,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            zIndex: 1000,
          }}
        >

          <div
            onClick={(e) =>
              e.stopPropagation()
            }
            style={{
              width: "100%",
              maxWidth: "700px",
              maxHeight: "90vh",
              overflowY: "auto",
              background: "#ffffff",
              borderRadius: "16px",
              padding: "28px",
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "25px",
              }}
            >

              <div>

                <h2
                  style={{
                    margin: 0,
                  }}
                >
                  New Announcement
                </h2>

                <p
                  style={{
                    margin:
                      "6px 0 0",
                    color:
                      "#64748b",
                  }}
                >
                  Create a school notice,
                  holiday or celebration
                  announcement.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowForm(false)
                }
                style={{
                  border: "none",
                  background: "#f1f5f9",
                  width: "38px",
                  height: "38px",
                  borderRadius: "8px",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>

            </div>

            <form
              onSubmit={
                handleSubmit
              }
            >

              {/* TITLE */}

              <div
                style={{
                  marginBottom:
                    "18px",
                }}
              >

                <label
                  style={{
                    display:
                      "block",
                    marginBottom:
                      "7px",
                    fontWeight:
                      "600",
                  }}
                >
                  Announcement Title *
                </label>

                <input
                  name="title"
                  value={
                    form.title
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="e.g. School Holiday"
                  required
                  style={inputStyle}
                />

              </div>

              {/* TYPE */}

              <div
                style={{
                  marginBottom:
                    "18px",
                }}
              >

                <label
                  style={{
                    display:
                      "block",
                    marginBottom:
                      "7px",
                    fontWeight:
                      "600",
                  }}
                >
                  Announcement Type
                </label>

                <select
                  name="type"
                  value={
                    form.type
                  }
                  onChange={
                    handleChange
                  }
                  style={inputStyle}
                >

                  <option value="Notice">
                    Notice
                  </option>

                  <option value="Holiday">
                    Holiday
                  </option>

                  <option value="Celebration">
                    Celebration
                  </option>

                  <option value="Important">
                    Important
                  </option>

                </select>

              </div>

              {/* DATE */}

              <div
                style={{
                  marginBottom:
                    "18px",
                }}
              >

                <label
                  style={{
                    display:
                      "block",
                    marginBottom:
                      "7px",
                    fontWeight:
                      "600",
                  }}
                >
                  Date
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
                  style={inputStyle}
                />

              </div>

              {/* MESSAGE */}

              <div
                style={{
                  marginBottom:
                    "18px",
                }}
              >

                <label
                  style={{
                    display:
                      "block",
                    marginBottom:
                      "7px",
                    fontWeight:
                      "600",
                  }}
                >
                  Message *
                </label>

                <textarea
                  name="message"
                  value={
                    form.message
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Write announcement details..."
                  rows="5"
                  required
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                  }}
                />

              </div>

              {/* IMAGE */}

              <div
                style={{
                  marginBottom:
                    "25px",
                }}
              >

                <label
                  style={{
                    display:
                      "block",
                    marginBottom:
                      "7px",
                    fontWeight:
                      "600",
                  }}
                >
                  School Celebration / Activity Picture
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImageChange
                  }
                />

                {form.image && (
                  <img
                    src={form.image}
                    alt="Preview"
                    style={{
                      width: "150px",
                      height: "100px",
                      objectFit:
                        "cover",
                      borderRadius:
                        "8px",
                      marginTop:
                        "12px",
                    }}
                  />
                )}

              </div>

              {/* BUTTONS */}

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "flex-end",
                  gap: "12px",
                }}
              >

                <button
                  type="button"
                  onClick={() =>
                    setShowForm(false)
                  }
                  style={{
                    padding:
                      "11px 18px",
                    border:
                      "1px solid #cbd5e1",
                    background:
                      "#ffffff",
                    borderRadius:
                      "8px",
                    cursor:
                      "pointer",
                  }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  style={{
                    padding:
                      "11px 20px",
                    border: "none",
                    background:
                      "#2563eb",
                    color:
                      "#ffffff",
                    borderRadius:
                      "8px",
                    fontWeight:
                      "700",
                    cursor:
                      "pointer",
                  }}
                >
                  Publish Announcement
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

// =====================================================
// INPUT STYLE
// =====================================================

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px 14px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  outline: "none",
  fontSize: "14px",
};

export default Announcements;