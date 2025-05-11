import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from "react-native";

const CareerSupport = () => {
  const handleEmailPress = () => {
    Linking.openURL(
      "mailto:abratul041@gmail.com?subject=Job Interview Query or Feedback"
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎯 Career Support & Interview Prep</Text>

      <Text style={styles.description}>
        Whether you're applying for your first job or aiming for career growth,
        this guide offers practical advice and questions for interviews across
        industries.
      </Text>

      {/* Industries Section */}
      <Text style={styles.sectionTitle}>💼 Industries Covered</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>• Hospitality (Hotels, Restaurants)</Text>
        <Text style={styles.bullet}>• Retail and Sales</Text>
        <Text style={styles.bullet}>• Healthcare and Nursing</Text>
        <Text style={styles.bullet}>• Office Admin & Customer Support</Text>
        <Text style={styles.bullet}>• Construction & Maintenance</Text>
        <Text style={styles.bullet}>• Education & Training</Text>
        <Text style={styles.bullet}>• Tech & Software</Text>
      </View>

      {/* General Tips */}
      <Text style={styles.sectionTitle}>📌 General Interview Tips</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>
          • Be punctual and dress professionally
        </Text>
        <Text style={styles.bullet}>
          • Carry printed copies of your CV/resume
        </Text>
        <Text style={styles.bullet}>
          • Do background research about the company
        </Text>
        <Text style={styles.bullet}>
          • Practice questions specific to your industry
        </Text>
        <Text style={styles.bullet}>• Speak clearly and confidently</Text>
      </View>

      {/* Sample Questions */}
      <Text style={styles.sectionTitle}>📘 Sample Questions by Industry</Text>
      <View style={styles.bulletContainer}>
        <Text style={styles.bullet}>
          • <Text style={styles.industry}>Hospitality:</Text> “How would you
          handle a difficult guest?”
        </Text>
        <Text style={styles.bullet}>
          • <Text style={styles.industry}>Retail:</Text> “What would you do if a
          customer complains about a product?”
        </Text>
        <Text style={styles.bullet}>
          • <Text style={styles.industry}>Healthcare:</Text> “How do you handle
          high-stress situations in patient care?”
        </Text>
        <Text style={styles.bullet}>
          • <Text style={styles.industry}>Construction:</Text> “Give an example
          of following safety procedures on-site.”
        </Text>
        <Text style={styles.bullet}>
          • <Text style={styles.industry}>Education:</Text> “How would you
          engage a student who is struggling?”
        </Text>
        <Text style={styles.bullet}>
          • <Text style={styles.industry}>Tech:</Text> “Explain a project you
          built and the technologies you used.”
        </Text>
      </View>

      {/* Contact Section */}
      <Text style={styles.sectionTitle}>📬 Need Help or Want to Report?</Text>
      <Text style={styles.text}>
        Send your questions, feedback, or interview experiences. We're here to
        help you succeed!
      </Text>
      <TouchableOpacity onPress={handleEmailPress}>
        <Text style={styles.email}>jobprep@yourapp.com</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#9475d6",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 8,
    color: "#9475d6",
  },
  bulletContainer: {
    marginLeft: 10,
    marginBottom: 10,
  },
  bullet: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    marginBottom: 4,
  },
  industry: {
    fontWeight: "bold",
    color: "#9475d6",
  },
  text: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
  },
  email: {
    marginTop: 10,
    fontSize: 16,
    color: "#0288d1",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});

export default CareerSupport;
