import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    color: "#2E7CE2",
  },
  loginText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingBottom: 3,
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
  },
  icon: {
    marginLeft: 8,
    color: "gray",
  },
  input: {
    color: "gray",
    marginVertical: 10,
    width: 250,
    fontSize: 15,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 3,
    marginTop: 20,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
  },
  buttonContainer: {
    width: 200,
    backgroundColor: "#2E7CE2",
    borderRadius: 6,
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  signupText: {
    textAlign: "center",
    fontSize: 15,
    color: "gray",
  },
});

export default styles;
