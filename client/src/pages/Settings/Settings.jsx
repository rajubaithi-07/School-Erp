import React, { useState } from "react";
import "../../styles/settings.css";

function Settings() {
  const [schoolSettings, setSchoolSettings] = useState({
    schoolName: "School ERP",
    schoolCode: "SCH001",
    email: "admin@schoolerp.com",
    phone: "",
    address: "",
    city: "Siddipet",
    state: "Telangana",
    pincode: "",
  });

  const [adminSettings, setAdminSettings] = useState({
    name: "Admin",
    email: "admin@schoolerp.com",
    phone: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    activityNotifications: true,
    feeNotifications: true,
    attendanceNotifications: true,
  });

  const [saved, setSaved] = useState(false);

  // =====================================================
  // SCHOOL SETTINGS
  // =====================================================

  const handleSchoolChange = (e) => {
    const { name, value } = e.target;

    setSchoolSettings((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  // =====================================================
  // ADMIN SETTINGS
  // =====================================================

  const handleAdminChange = (e) => {
    const { name, value } = e.target;

    setAdminSettings((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  // =====================================================
  // NOTIFICATION SETTINGS
  // =====================================================

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;

    setNotifications((prev) => ({
      ...prev,
      [name]: checked,
    }));

    setSaved(false);
  };

  // =====================================================
  // SAVE SETTINGS
  // =====================================================

  const handleSave = () => {
    localStorage.setItem(
      "schoolSettings",
      JSON.stringify(schoolSettings)
    );

    localStorage.setItem(
      "adminSettings",
      JSON.stringify(adminSettings)
    );

    localStorage.setItem(
      "notificationSettings",
      JSON.stringify(notifications)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {
    setSchoolSettings({
      schoolName: "School ERP",
      schoolCode: "SCH001",
      email: "admin@schoolerp.com",
      phone: "",
      address: "",
      city: "Siddipet",
      state: "Telangana",
      pincode: "",
    });

    setAdminSettings({
      name: "Admin",
      email: "admin@schoolerp.com",
      phone: "",
    });

    setNotifications({
      emailNotifications: true,
      activityNotifications: true,
      feeNotifications: true,
      attendanceNotifications: true,
    });

    setSaved(false);
  };

  return (
    <div className="settings-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="settings-header">

        <div>
          <span className="settings-eyebrow">
            SCHOOL ERP
          </span>

          <h1>Settings</h1>

          <p>
            Configure your school information,
            administrator profile and preferences.
          </p>
        </div>

        <div className="settings-header-icon">
          ⚙️
        </div>

      </div>

      {/* =================================================
          SUCCESS MESSAGE
      ================================================= */}

      {saved && (
        <div className="settings-success">
          <span>✓</span>

          <div>
            <strong>Settings saved successfully</strong>
            <p>
              Your School ERP settings have been updated.
            </p>
          </div>
        </div>
      )}

      {/* =================================================
          SCHOOL INFORMATION
      ================================================= */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div className="settings-card-icon">
            🏫
          </div>

          <div>
            <h2>School Information</h2>

            <p>
              Manage your school's basic information.
            </p>
          </div>

        </div>

        <div className="settings-divider"></div>

        <div className="settings-grid">

          <div className="settings-field">

            <label>
              School Name <span>*</span>
            </label>

            <input
              type="text"
              name="schoolName"
              value={schoolSettings.schoolName}
              onChange={handleSchoolChange}
              placeholder="Enter school name"
            />

          </div>

          <div className="settings-field">

            <label>
              School Code
            </label>

            <input
              type="text"
              name="schoolCode"
              value={schoolSettings.schoolCode}
              onChange={handleSchoolChange}
              placeholder="SCH001"
            />

          </div>

          <div className="settings-field">

            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={schoolSettings.email}
              onChange={handleSchoolChange}
              placeholder="school@example.com"
            />

          </div>

          <div className="settings-field">

            <label>
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={schoolSettings.phone}
              onChange={handleSchoolChange}
              placeholder="Enter phone number"
            />

          </div>

          <div className="settings-field settings-full">

            <label>
              Address
            </label>

            <textarea
              name="address"
              value={schoolSettings.address}
              onChange={handleSchoolChange}
              placeholder="Enter school address"
              rows="3"
            />

          </div>

          <div className="settings-field">

            <label>
              City
            </label>

            <input
              type="text"
              name="city"
              value={schoolSettings.city}
              onChange={handleSchoolChange}
              placeholder="City"
            />

          </div>

          <div className="settings-field">

            <label>
              State
            </label>

            <input
              type="text"
              name="state"
              value={schoolSettings.state}
              onChange={handleSchoolChange}
              placeholder="State"
            />

          </div>

          <div className="settings-field">

            <label>
              PIN Code
            </label>

            <input
              type="text"
              name="pincode"
              value={schoolSettings.pincode}
              onChange={handleSchoolChange}
              placeholder="PIN Code"
            />

          </div>

        </div>

      </section>

      {/* =================================================
          ADMIN PROFILE
      ================================================= */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div className="settings-card-icon">
            👤
          </div>

          <div>
            <h2>Administrator Profile</h2>

            <p>
              Manage the administrator information.
            </p>
          </div>

        </div>

        <div className="settings-divider"></div>

        <div className="settings-grid">

          <div className="settings-field">

            <label>
              Administrator Name
            </label>

            <input
              type="text"
              name="name"
              value={adminSettings.name}
              onChange={handleAdminChange}
              placeholder="Administrator name"
            />

          </div>

          <div className="settings-field">

            <label>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={adminSettings.email}
              onChange={handleAdminChange}
              placeholder="Administrator email"
            />

          </div>

          <div className="settings-field">

            <label>
              Phone Number
            </label>

            <input
              type="text"
              name="phone"
              value={adminSettings.phone}
              onChange={handleAdminChange}
              placeholder="Phone number"
            />

          </div>

        </div>

      </section>

      {/* =================================================
          NOTIFICATIONS
      ================================================= */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div className="settings-card-icon">
            🔔
          </div>

          <div>
            <h2>Notification Preferences</h2>

            <p>
              Choose which notifications you want to receive.
            </p>
          </div>

        </div>

        <div className="settings-divider"></div>

        <div className="notification-list">

          <label className="notification-item">

            <div>
              <strong>Email Notifications</strong>

              <span>
                Receive important system updates through email.
              </span>
            </div>

            <input
              type="checkbox"
              name="emailNotifications"
              checked={notifications.emailNotifications}
              onChange={handleNotificationChange}
            />

          </label>

          <label className="notification-item">

            <div>
              <strong>Activity Notifications</strong>

              <span>
                Receive notifications about school activities.
              </span>
            </div>

            <input
              type="checkbox"
              name="activityNotifications"
              checked={notifications.activityNotifications}
              onChange={handleNotificationChange}
            />

          </label>

          <label className="notification-item">

            <div>
              <strong>Fee Notifications</strong>

              <span>
                Receive updates about fee records and payments.
              </span>
            </div>

            <input
              type="checkbox"
              name="feeNotifications"
              checked={notifications.feeNotifications}
              onChange={handleNotificationChange}
            />

          </label>

          <label className="notification-item">

            <div>
              <strong>Attendance Notifications</strong>

              <span>
                Receive important attendance updates.
              </span>
            </div>

            <input
              type="checkbox"
              name="attendanceNotifications"
              checked={notifications.attendanceNotifications}
              onChange={handleNotificationChange}
            />

          </label>

        </div>

      </section>

      {/* =================================================
          SECURITY
      ================================================= */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div className="settings-card-icon">
            🔐
          </div>

          <div>
            <h2>Security</h2>

            <p>
              Manage your account security settings.
            </p>
          </div>

        </div>

        <div className="settings-divider"></div>

        <div className="security-row">

          <div>
            <strong>Password</strong>

            <p>
              Change your administrator password regularly
              to keep your account secure.
            </p>
          </div>

          <button
            type="button"
            className="secondary-settings-button"
            onClick={() =>
              alert("Password change module will be added next.")
            }
          >
            Change Password
          </button>

        </div>

      </section>

      {/* =================================================
          ACTIONS
      ================================================= */}

      <div className="settings-actions">

        <button
          type="button"
          className="reset-settings-button"
          onClick={handleReset}
        >
          Reset
        </button>

        <button
          type="button"
          className="save-settings-button"
          onClick={handleSave}
        >
          ✓ Save Settings
        </button>

      </div>

    </div>
  );
}

export default Settings;