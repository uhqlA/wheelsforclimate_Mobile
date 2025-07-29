import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  Modal,
} from "react-native";
import { Calendar } from "react-native-calendars";

const { width } = Dimensions.get("window");

const DatePicker = ({ selectedDate, onDateChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(selectedDate || "");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Format date for display
  const formatDisplayDate = (dateString) => {
    if (!dateString) return "Select Date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDateSelect = (day) => {
    const selectedDateString = day.dateString;
    setCurrentDate(selectedDateString);
    onDateChange(selectedDateString);
    setShowCalendar(false);
  };

  const openCalendar = () => {
    setShowCalendar(true);
  };

  const closeCalendar = () => {
    setShowCalendar(false);
  };

  // Prepare marked dates for calendar
  const markedDates = currentDate
    ? {
        [currentDate]: {
          selected: true,
          selectedColor: "#4caf50",
          selectedTextColor: "white",
        },
      }
    : {};

  return (
    <View>
      <TouchableOpacity style={styles.dateButton} onPress={openCalendar}>
        <Text
          style={[
            styles.dateButtonText,
            !currentDate && styles.placeholderText,
          ]}
        >
          {formatDisplayDate(currentDate)}
        </Text>
        <Text style={styles.calendarIcon}>📅</Text>
      </TouchableOpacity>

      <Modal
        visible={showCalendar}
        animationType="slide"
        transparent={true}
        onRequestClose={closeCalendar}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeCalendar}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <Calendar
              onDayPress={handleDateSelect}
              markedDates={markedDates}
              maxDate={today}
              theme={{
                backgroundColor: "#ffffff",
                calendarBackground: "#ffffff",
                textSectionTitleColor: "#2c5530",
                selectedDayBackgroundColor: "#4caf50",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#4caf50",
                dayTextColor: "#2d4150",
                textDisabledColor: "#d9e1e8",
                dotColor: "#4caf50",
                selectedDotColor: "#ffffff",
                arrowColor: "#4caf50",
                disabledArrowColor: "#d9e1e8",
                monthTextColor: "#2c5530",
                indicatorColor: "#4caf50",
                textDayFontFamily: Platform.OS === "ios" ? "System" : "Roboto",
                textMonthFontFamily:
                  Platform.OS === "ios" ? "System" : "Roboto",
                textDayHeaderFontFamily:
                  Platform.OS === "ios" ? "System" : "Roboto",
                textDayFontWeight: "400",
                textMonthFontWeight: "bold",
                textDayHeaderFontWeight: "600",
                textDayFontSize: 16,
                textMonthFontSize: 18,
                textDayHeaderFontSize: 14,
              }}
              style={styles.calendar}
            />

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.todayButton}
                onPress={() => handleDateSelect({ dateString: today })}
              >
                <Text style={styles.todayButtonText}>Today</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={closeCalendar}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "white",
    minHeight: 48,
  },
  dateButtonText: {
    fontSize: Math.min(16, width * 0.04),
    color: "#333",
  },
  placeholderText: {
    color: "#999",
  },
  calendarIcon: {
    fontSize: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 15,
    width: Math.min(350, width * 0.9),
    maxHeight: "80%",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c5530",
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "bold",
  },
  calendar: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  todayButton: {
    flex: 1,
    paddingVertical: 12,
    marginRight: 10,
    borderRadius: 8,
    backgroundColor: "#4caf50",
    alignItems: "center",
  },
  todayButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "white",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default DatePicker;
