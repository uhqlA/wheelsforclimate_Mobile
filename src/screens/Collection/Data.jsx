import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DatePicker from "../../components/DatePicker";
import Geocode from "../Geocode/Geocode";
import constants from "../../components/constants/constants";

const { width, height } = Dimensions.get("window");

const CycleCOP30Form = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Page 1 - Route & Logistics
    date: "",
    country: "",
    latitude: "",
    longitude: "",
    distance_covered: "",
    average_speed: "",
    cycling_hours: "",
    breakdowns_encountered: 0,
    number_of_breakdowns: 0,
    charging_stops: "",
    elevation_gains: "",
    road_quality: "",

    // Page 2 - Community Engagement
    total_people_interacted: "",
    community_events: "",
    women_reached: "",
    youth_reached: "",
    marginalized_persons: "",
    community_feedback_score: "",

    // Page 3 - Knowledge Sharing & Awareness
    climate_messages: "",
    public_messaging_reach: "",
    audience_questions: "",
    educational_media: "",
    interviews: "",
    photos_videos: "",

    // Page 4 - Environment & Emissions
    visible_emissions: "",
    plastic_hotspots: "",
    nature_sites: "",
    climate_innovations: "",

    // Page 5 - Bicycle & Equipment Performance
    ebikes_in_use: "",
    power_station_eb70: 0,
    power_station_ac180p: 0,
    power_station_pv350: 0,
    power_station_p200_75w: 0,
    charging_mode: [],
    average_battery_use: "", // required: cannot be null
    equipment_breakdowns: false, // required: cannot be null
    equipment_breakdown_count: 0,

    // Page 6 - Team & Safety
    riders_today: "",
    team_health_score: "", // required: cannot be null
    hydration_check: "",
    injuries_accidents: false,
    injury_description: false,
    team_mood: 0,

    // Page 7 - Social Media & Visibility
    instagram_posts: "",
    tiktok_videos: "",
    linkedin_mentions: "",
    newsletter_mentions: "",
    media_contacts: "",
  });

  const pages = [
    "Route & Logistics",
    "Community Engagement",
    "Knowledge Sharing",
    "Environment & Emissions",
    "Equipment Performance",
    "Team & Safety",
    "Social Media",
  ];

  // Update form data with latitude and longitude when location changes
  useEffect(() => {
    if (location) {
      setFormData((prev) => ({
        ...prev,
        latitude: location.latitude.toFixed(6),
        longitude: location.longitude.toFixed(6),
      }));
    }
  }, [location]);

  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // API function to submit form data
  const onSubmit = async () => {
    console.log("submitting data ", formData);
    await fetch(`${constants.BASE_URL}/api/daily-recaps/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.json())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        //here you can set loading to false
      });
  };

  const RatingButton = ({ rating, selectedRating, onPress }) => (
    <TouchableOpacity
      style={[
        styles.ratingButton,
        selectedRating === rating && styles.ratingButtonSelected,
      ]}
      onPress={() => onPress(rating)}
    >
      <Text
        style={[
          styles.ratingText,
          selectedRating === rating && styles.ratingTextSelected,
        ]}
      >
        {rating}
      </Text>
    </TouchableOpacity>
  );

  const YesNoButton = ({ value, selectedValue, onPress, label }) => (
    <TouchableOpacity
      style={[
        styles.yesNoButton,
        selectedValue === value && styles.yesNoButtonSelected,
      ]}
      onPress={() => onPress(value)}
    >
      <Text
        style={[
          styles.yesNoText,
          selectedValue === value && styles.yesNoTextSelected,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const CheckboxButton = ({ value, isSelected, onPress, label }) => (
    <TouchableOpacity
      style={[
        styles.checkboxButton,
        isSelected && styles.checkboxButtonSelected,
      ]}
      onPress={() => onPress(value)}
    >
      <Text
        style={[styles.checkboxText, isSelected && styles.checkboxTextSelected]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const MoodButton = ({ emoji, mood, selectedMood, onPress }) => (
    <TouchableOpacity
      style={[
        styles.moodButton,
        selectedMood === mood && styles.moodButtonSelected,
      ]}
      onPress={() => onPress(mood)}
    >
      <Text style={styles.moodEmoji}>{emoji}</Text>
    </TouchableOpacity>
  );

  const renderPage1 = () => (
    <ScrollView style={styles.pageContent}>
      <Text style={styles.pageTitle}>🔹 Route & Logistics</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
        <DatePicker
          selectedDate={formData.date}
          onDateChange={(date) => updateFormData("date", date)}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          value={formData.country}
          onChangeText={(value) => updateFormData("country", value)}
          placeholder="Enter country"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Location</Text>
        <View
          style={{
            backgroundColor: "#F0F1F6",
            alignItems: "center",
            alignSelf: "center",
            height: 128,
            width: 300,
            paddingTop: 20,
            borderWidth: 2,
            borderStyle: "dotted",
            borderRadius: 10,
          }}
        >
          <Text style={styles.textLabelCoord}>
            {location
              ? `Lat: ${location.latitude.toFixed(
                  6
                )}, Lng: ${location.longitude.toFixed(6)}`
              : "Press button below to get location"}
          </Text>
          <Geocode
            setLocation={setLocation}
            setLoading={setLoading}
            loading={loading}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Distance Covered (km) *</Text>
        <TextInput
          style={styles.input}
          value={formData.distance_covered}
          onChangeText={(value) => updateFormData("distance_covered", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Average Speed (km/h) *</Text>
        <TextInput
          style={styles.input}
          value={formData.average_speed}
          onChangeText={(value) => updateFormData("average_speed", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Cycling Hours Today *</Text>
        <TextInput
          style={styles.input}
          value={formData.cycling_hours}
          onChangeText={(value) => updateFormData("cycling_hours", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Breakdowns Encountered</Text>
        <View style={styles.yesNoContainer}>
          <YesNoButton
            value={true}
            selectedValue={formData.breakdowns_encountered}
            onPress={(value) => updateFormData("breakdowns_encountered", value)}
            label="Yes"
          />
          <YesNoButton
            value={false}
            selectedValue={formData.breakdowns_encountered}
            onPress={(value) => updateFormData("breakdowns_encountered", value)}
            label="No"
          />
        </View>
      </View>

      {formData.number_of_breakdowns === true && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>How many breakdowns? *</Text>
          <TextInput
            style={styles.input}
            value={formData.number_of_breakdowns}
            onChangeText={(value) =>
              updateFormData("number_of_breakdowns", value)
            }
            placeholder="0"
            keyboardType="numeric"
          />
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Charging Stops Made *</Text>
        <TextInput
          style={styles.input}
          value={formData.charging_stops}
          onChangeText={(value) => updateFormData("charging_stops", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Number of Elevation Gains (hilly areas) *
        </Text>
        <TextInput
          style={styles.input}
          value={formData.elevation_gains}
          onChangeText={(value) => updateFormData("elevation_gains", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Road Quality (1 = Poor, 5 = Excellent)</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <RatingButton
              key={rating}
              rating={rating}
              selectedRating={formData.road_quality}
              onPress={(value) => updateFormData("road_quality", value)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderPage2 = () => (
    <ScrollView style={styles.pageContent}>
      <Text style={styles.pageTitle}>🔹 Community Engagement</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Total People Interacted With Today *</Text>
        <TextInput
          style={styles.input}
          value={formData.total_people_interacted}
          onChangeText={(value) =>
            updateFormData("total_people_interacted", value)
          }
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Number of Community Events/Dialogs Held *
        </Text>
        <TextInput
          style={styles.input}
          value={formData.community_events}
          onChangeText={(value) => updateFormData("community_events", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Estimated No. of Women Reached *</Text>
        <TextInput
          style={styles.input}
          value={formData.women_reached}
          onChangeText={(value) => updateFormData("women_reached", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Estimated No. of Youth Reached (under 25) *
        </Text>
        <TextInput
          style={styles.input}
          value={formData.youth_reached}
          onChangeText={(value) => updateFormData("youth_reached", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Estimated No. of Marginalized Persons (PWDs, Indigenous, LGBTQIA+,
          etc.) *
        </Text>
        <TextInput
          style={styles.input}
          value={formData.marginalized_persons}
          onChangeText={(value) =>
            updateFormData("marginalized_persons", value)
          }
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Community Feedback Score (1 = Low interest, 5 = High engagement)
        </Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <RatingButton
              key={rating}
              rating={rating}
              selectedRating={formData.community_feedback_score}
              onPress={(value) =>
                updateFormData("community_feedback_score", value)
              }
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderPage3 = () => (
    <ScrollView style={styles.pageContent}>
      <Text style={styles.pageTitle}>🔹 Knowledge Sharing & Awareness</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Number of Climate Messages Shared (posters, flyers, talks) *
        </Text>
        <TextInput
          style={styles.input}
          value={formData.climate_messages}
          onChangeText={(value) => updateFormData("climate_messages", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          No. of People Reached via Public Messaging *
        </Text>
        <TextInput
          style={styles.input}
          value={formData.public_messaging_reach}
          onChangeText={(value) =>
            updateFormData("public_messaging_reach", value)
          }
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          No. of Questions/Comments from the Audience *
        </Text>
        <TextInput
          style={styles.input}
          value={formData.audience_questions}
          onChangeText={(value) => updateFormData("audience_questions", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Educational Media Shared (videos, QR codes, etc.) *
        </Text>
        <TextInput
          style={styles.input}
          value={formData.educational_media}
          onChangeText={(value) => updateFormData("educational_media", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Interviews Conducted Today (audio/video) *
        </Text>
        <TextInput
          style={styles.input}
          value={formData.interviews}
          onChangeText={(value) => updateFormData("interviews", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Photos/Videos Captured for Documentation *
        </Text>
        <TextInput
          style={styles.input}
          value={formData.photos_videos}
          onChangeText={(value) => updateFormData("photos_videos", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>
    </ScrollView>
  );

  const renderPage4 = () => (
    <ScrollView style={styles.pageContent}>
      <Text style={styles.pageTitle}>🔹 Environment & Emissions</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Visible Emissions Points (e.g. open fires, exhaust, industry) *
        </Text>
        <TextInput
          style={styles.input}
          value={formData.visible_emissions}
          onChangeText={(value) => updateFormData("visible_emissions", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Plastic/Littering Hotspots Identified *
        </Text>
        <TextInput
          style={styles.input}
          value={formData.plastic_hotspots}
          onChangeText={(value) => updateFormData("plastic_hotspots", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Trees/Nature Conservation Sites Visited *
        </Text>
        <TextInput
          style={styles.input}
          value={formData.nature_sites}
          onChangeText={(value) => updateFormData("nature_sites", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Climate Innovations Witnessed (local solutions) *
        </Text>
        <TextInput
          style={styles.input}
          value={formData.climate_innovations}
          onChangeText={(value) => updateFormData("climate_innovations", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>
    </ScrollView>
  );

  const renderPage5 = () => (
    <ScrollView style={styles.pageContent}>
      <Text style={styles.pageTitle}>🔹 Bicycle & Equipment Performance</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>No. of Ebikes in Use Today *</Text>
        <TextInput
          style={styles.input}
          value={formData.ebikes_in_use}
          onChangeText={(value) => updateFormData("ebikes_in_use", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Power Stations Used (Bluetti)</Text>

        <View style={styles.subInputGroup}>
          <Text style={styles.subLabel}>EB70 *</Text>
          <TextInput
            style={styles.input}
            value={formData.power_station_eb70}
            onChangeText={(value) =>
              updateFormData("power_station_eb70", value)
            }
            placeholder="0"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.subInputGroup}>
          <Text style={styles.subLabel}>AC180P *</Text>
          <TextInput
            style={styles.input}
            value={formData.power_station_ac180p}
            onChangeText={(value) =>
              updateFormData("power_station_ac180p", value)
            }
            placeholder="0"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.subInputGroup}>
          <Text style={styles.subLabel}>PV350 *</Text>
          <TextInput
            style={styles.input}
            value={formData.power_station_pv350}
            onChangeText={(value) =>
              updateFormData("power_station_pv350", value)
            }
            placeholder="0"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.subInputGroup}>
          <Text style={styles.subLabel}>P200+75W *</Text>
          <TextInput
            style={styles.input}
            value={formData.power_station_p200_75w}
            onChangeText={(value) =>
              updateFormData("power_station_p200_75w", value)
            }
            placeholder="0"
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Charging Mode Used</Text>
        <View style={styles.checkboxContainer}>
          {["Solar", "Grid", "None"].map((mode) => (
            <CheckboxButton
              key={mode}
              value={mode}
              isSelected={formData.charging_mode.includes(mode)}
              onPress={(value) => {
                const current = formData.charging_mode;
                const updated = current.includes(value)
                  ? current.filter((item) => item !== value)
                  : [...current, value];
                updateFormData("charging_mode", updated);
              }}
              label={mode}
            />
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Average Battery Use Per Bike (in %) *</Text>
        <TextInput
          style={styles.input}
          value={formData.average_battery_use}
          onChangeText={(value) => updateFormData("average_battery_use", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Breakdowns Reported (bike or equipment)
        </Text>
        <View style={styles.yesNoContainer}>
          <YesNoButton
            value={true}
            selectedValue={formData.equipment_breakdowns}
            onPress={(value) => updateFormData("equipment_breakdowns", value)}
            label="Yes"
          />
          <YesNoButton
            value={false}
            selectedValue={formData.equipment_breakdowns}
            onPress={(value) => updateFormData("equipment_breakdowns", value)}
            label="No"
          />
        </View>
      </View>

      {formData.equipment_breakdowns && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>How many? *</Text>
          <TextInput
            style={styles.input}
            value={formData.equipment_breakdowns}
            onChangeText={(value) =>
              updateFormData("equipment_breakdowns", value)
            }
            placeholder="0"
            keyboardType="numeric"
          />
        </View>
      )}
    </ScrollView>
  );

  const renderPage6 = () => (
    <ScrollView style={styles.pageContent}>
      <Text style={styles.pageTitle}>🔹 Team & Safety</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>No. of Riders Today *</Text>
        <TextInput
          style={styles.input}
          value={formData.riders_today}
          onChangeText={(value) => updateFormData("riders_today", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          Team Health Score (1 = Bad, 5 = Excellent)
        </Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((rating) => (
            <RatingButton
              key={rating}
              rating={rating}
              selectedRating={formData.team_health_score}
              onPress={(value) => updateFormData("team_health_score", value)}
            />
          ))}
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Hydration Check (Yes/No per rider)</Text>
        <TextInput
          style={styles.input}
          value={formData.hydration_check}
          onChangeText={(value) => updateFormData("hydration_check", value)}
          placeholder="e.g., 3/5 riders hydrated"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Any Injuries or Accidents?</Text>
        <View style={styles.yesNoContainer}>
          <YesNoButton
            value={true}
            selectedValue={formData.injuries_accidents}
            onPress={(value) => updateFormData("injuries_accidents", value)}
            label="Yes"
          />
          <YesNoButton
            value={false}
            selectedValue={formData.injuries_accidents}
            onPress={(value) => updateFormData("injuries_accidents", value)}
            label="No"
          />
        </View>
      </View>

      {formData.injuries_accidents && (
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Describe briefly</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.injury_description}
            onChangeText={(value) =>
              updateFormData("injury_description", value)
            }
            placeholder="Brief description of injury/accident"
            multiline
            numberOfLines={3}
          />
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Team Reflection Mood</Text>
        <View style={styles.moodContainer}>
          {[
            { emoji: "😩", mood: 1 },
            { emoji: "😐", mood: 2 },
            { emoji: "🙂", mood: 3 },
            { emoji: "😄", mood: 4 },
            { emoji: "😍", mood: 5 },
          ].map(({ emoji, mood }) => (
            <MoodButton
              key={mood}
              emoji={emoji}
              mood={mood}
              selectedMood={formData.team_mood}
              onPress={(value) => updateFormData("team_mood", value)}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );

  const renderPage7 = () => (
    <ScrollView style={styles.pageContent}>
      <Text style={styles.pageTitle}>🔹 Social Media & Visibility</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Instagram Posts Shared *</Text>
        <TextInput
          style={styles.input}
          value={formData.instagram_posts}
          onChangeText={(value) => updateFormData("instagram_posts", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>TikTok Videos Uploaded *</Text>
        <TextInput
          style={styles.input}
          value={formData.tiktok_videos}
          onChangeText={(value) => updateFormData("tiktok_videos", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>LinkedIn Mentions *</Text>
        <TextInput
          style={styles.input}
          value={formData.linkedin_mentions}
          onChangeText={(value) => updateFormData("linkedin_mentions", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Newsletter Mentions Today *</Text>
        <View style={styles.yesNoContainer}>
          <YesNoButton
            value={true}
            selectedValue={formData.newsletter_mentions}
            onPress={(value) => updateFormData("newsletter_mentions", value)}
            label="Yes"
          />
          <YesNoButton
            value={false}
            selectedValue={formData.newsletter_mentions}
            onPress={(value) => updateFormData("newsletter_mentions", value)}
            label="No"
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Press/Media Contacts Made Today *</Text>
        <TextInput
          style={styles.input}
          value={formData.media_contacts}
          onChangeText={(value) => updateFormData("media_contacts", value)}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>
    </ScrollView>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 0:
        return renderPage1();
      case 1:
        return renderPage2();
      case 2:
        return renderPage3();
      case 3:
        return renderPage4();
      case 4:
        return renderPage5();
      case 5:
        return renderPage6();
      case 6:
        return renderPage7();
      default:
        return renderPage1();
    }
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cycle COP30 Daily Recap</Text>
        <Text style={styles.subtitle}>Data Collection Tool</Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentPage + 1) / pages.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentPage + 1} of {pages.length} - {pages[currentPage]}
        </Text>
      </View>

      {renderCurrentPage()}

      <View style={styles.navigationContainer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentPage === 0 && styles.navButtonDisabled,
          ]}
          onPress={prevPage}
          disabled={currentPage === 0}
        >
          <Text
            style={[
              styles.navButtonText,
              currentPage === 0 && styles.navButtonTextDisabled,
            ]}
          >
            Previous
          </Text>
        </TouchableOpacity>

        {currentPage === pages.length - 1 ? (
          <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.navButton} onPress={nextPage}>
            <Text style={styles.navButtonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#2c5530",
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    fontSize: Math.min(24, width * 0.06),
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  subtitle: {
    fontSize: Math.min(16, width * 0.04),
    color: "#e8f5e9",
    textAlign: "center",
    marginTop: 5,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    marginBottom: 10,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4caf50",
    borderRadius: 3,
  },
  progressText: {
    fontSize: Math.min(14, width * 0.035),
    color: "#666",
    textAlign: "center",
    fontWeight: "500",
  },
  pageContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: Math.min(20, width * 0.05),
    fontWeight: "bold",
    color: "#2c5530",
    marginVertical: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  subInputGroup: {
    marginBottom: 15,
    marginLeft: 10,
  },
  label: {
    fontSize: Math.min(16, width * 0.04),
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    lineHeight: 22,
  },
  subLabel: {
    fontSize: Math.min(14, width * 0.035),
    fontWeight: "500",
    color: "#555",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: Math.min(16, width * 0.04),
    backgroundColor: "white",
    minHeight: 48,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  ratingButton: {
    width: Math.min(50, width * 0.12),
    height: Math.min(50, width * 0.12),
    borderRadius: Math.min(25, width * 0.06),
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  ratingButtonSelected: {
    borderColor: "#4caf50",
    backgroundColor: "#4caf50",
  },
  ratingText: {
    fontSize: Math.min(18, width * 0.045),
    fontWeight: "bold",
    color: "#666",
  },
  ratingTextSelected: {
    color: "white",
  },
  yesNoContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  yesNoButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "white",
    alignItems: "center",
  },
  yesNoButtonSelected: {
    borderColor: "#4caf50",
    backgroundColor: "#4caf50",
  },
  yesNoText: {
    fontSize: Math.min(16, width * 0.04),
    fontWeight: "600",
    color: "#666",
  },
  yesNoTextSelected: {
    color: "white",
  },
  checkboxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
  },
  checkboxButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    backgroundColor: "white",
  },
  checkboxButtonSelected: {
    borderColor: "#4caf50",
    backgroundColor: "#e8f5e9",
  },
  checkboxText: {
    fontSize: Math.min(14, width * 0.035),
    fontWeight: "500",
    color: "#666",
  },
  checkboxTextSelected: {
    color: "#2c5530",
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  moodButton: {
    width: Math.min(60, width * 0.15),
    height: Math.min(60, width * 0.15),
    borderRadius: Math.min(30, width * 0.075),
    borderWidth: 2,
    borderColor: "#ddd",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  moodButtonSelected: {
    borderColor: "#ff9800",
    backgroundColor: "#fff3e0",
  },
  moodEmoji: {
    fontSize: Math.min(30, width * 0.075),
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    ...Platform.select({
      ios: {
        paddingBottom: 35,
      },
      android: {
        paddingBottom: 20,
      },
    }),
  },
  navButton: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#4caf50",
    backgroundColor: "white",
    alignItems: "center",
  },
  navButtonDisabled: {
    borderColor: "#ddd",
    backgroundColor: "#f5f5f5",
  },
  navButtonText: {
    fontSize: Math.min(16, width * 0.04),
    fontWeight: "600",
    color: "#4caf50",
  },
  navButtonTextDisabled: {
    color: "#999",
  },
  submitButton: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 8,
    backgroundColor: "#2c5530",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: Math.min(16, width * 0.04),
    fontWeight: "700",
    color: "white",
  },
});

export default CycleCOP30Form;
