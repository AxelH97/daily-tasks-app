import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#874CCC",
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
    backgroundColor: "#E0E0E0",
    paddingVertical: 3,
    borderRadius: 5,
    marginTop: 10,
  },
  icon: {
    marginLeft: 8,
    color: "gray",
  },
  input: {
    color: "gray",
    marginVertical: 10,
    width: 250,
    fontSize: 17,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E0E0E0",
    paddingVertical: 3,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonContainer: {
    width: 200,
    backgroundColor: "#874CCC",
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
