import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: "#DDDDDD",
    borderRadius: 5,
    marginBottom: 10,
  },
  listItem: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    marginBottom: 10,
  },
  listItemText: {
    fontSize: 16,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    width: "100%",
  },
  buttons: {
    flexDirection: "row",
  },
  saveButton: {
    margin: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    margin: 10,
  },
  editButton: {
    backgroundColor: "blue",
    margin: 10,
  },
});

export default styles;
