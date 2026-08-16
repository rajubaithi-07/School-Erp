const Activity = require("../models/Activity");

// =====================================================
// GET ALL ACTIVITIES
// =====================================================

const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: activities.length,
      activities,
    });
  } catch (error) {
    console.error("Get Activities Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE ACTIVITY
// =====================================================

const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(
      req.params.id
    );

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    res.status(200).json({
      success: true,
      activity,
    });
  } catch (error) {
    console.error("Get Activity Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch activity",
      error: error.message,
    });
  }
};

// =====================================================
// CREATE ACTIVITY
// =====================================================

const createActivity = async (req, res) => {
  try {
    const {
      activityName,
      activityType,
      date,
      time,
      location,
      coordinator,
      description,
      status,
    } = req.body;

    if (
      !activityName ||
      !activityType ||
      !date ||
      !time ||
      !location ||
      !coordinator
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Activity name, type, date, time, location and coordinator are required",
      });
    }

    const activity = await Activity.create({
      activityName: activityName.trim(),
      activityType: activityType.trim(),
      date: date.trim(),
      time: time.trim(),
      location: location.trim(),
      coordinator: coordinator.trim(),
      description:
        description?.trim() || "",
      status: status || "Upcoming",
    });

    res.status(201).json({
      success: true,
      message: "Activity created successfully",
      activity,
    });
  } catch (error) {
    console.error(
      "Create Activity Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to create activity",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE ACTIVITY
// =====================================================

const updateActivity = async (req, res) => {
  try {
    const activity =
      await Activity.findById(
        req.params.id
      );

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    const {
      activityName,
      activityType,
      date,
      time,
      location,
      coordinator,
      description,
      status,
    } = req.body;

    activity.activityName =
      activityName?.trim() ||
      activity.activityName;

    activity.activityType =
      activityType?.trim() ||
      activity.activityType;

    activity.date =
      date?.trim() ||
      activity.date;

    activity.time =
      time?.trim() ||
      activity.time;

    activity.location =
      location?.trim() ||
      activity.location;

    activity.coordinator =
      coordinator?.trim() ||
      activity.coordinator;

    activity.description =
      description?.trim() || "";

    activity.status =
      status || activity.status;

    await activity.save();

    res.status(200).json({
      success: true,
      message: "Activity updated successfully",
      activity,
    });
  } catch (error) {
    console.error(
      "Update Activity Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update activity",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE ACTIVITY
// =====================================================

const deleteActivity = async (req, res) => {
  try {
    const activity =
      await Activity.findByIdAndDelete(
        req.params.id
      );

    if (!activity) {
      return res.status(404).json({
        success: false,
        message: "Activity not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Activity deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete Activity Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete activity",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};