import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";
import { API_URL } from "../data/api";

const TaskOverview = () => {
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);

  const fetchTaskData = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos/count`);
      const { totalCompletedTodos, totalPendingTodos } = response.data;
      setCompletedTasks(totalCompletedTodos);
      setPendingTasks(totalPendingTodos);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchTaskData();
  }, []);

  console.log("Completed Tasks:", completedTasks);
  console.log("Pending Tasks:", pendingTasks);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>
            Overview of Tasks for the Past 15 Days
          </Text>
          <Text style={styles.headerSubtitle}>Select Categories</Text>
        </View>
      </View>

      <View style={styles.overviewContainer}>
        <Text style={styles.sectionTitle}>Task Summary</Text>
        <View style={styles.taskSummary}>
          <View style={[styles.taskBox, styles.completedTaskBox]}>
            <Text style={styles.taskCount}>{completedTasks}</Text>
            <Text style={styles.taskLabel}>Completed Tasks</Text>
          </View>

          <View style={[styles.taskBox, styles.pendingTaskBox]}>
            <Text style={styles.taskCount}>{pendingTasks}</Text>
            <Text style={styles.taskLabel}>Pending Tasks</Text>
          </View>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: ["Pending Tasks", "Completed Tasks"],
            datasets: [
              {
                data: [pendingTasks, completedTasks],
              },
            ],
          }}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisInterval={2}
          chartConfig={{
            backgroundColor: "#1e3c72",
            backgroundGradientFrom: "#2a5298",
            backgroundGradientTo: "#6dd5ed",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#6dd5ed",
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      <View style={styles.nextTasksContainer}>
        <Text style={styles.nextTasksText}>Tasks for the Next Seven Days</Text>
      </View>

      <View style={styles.footerImageContainer}>
        <Image source={require("../image/iconTodo.png")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    backgroundColor: "#2E7CE2",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "white",
    marginTop: 4,
  },
  overviewContainer: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
    textAlign: "center",
  },
  taskSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  taskBox: {
    padding: 10,
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  completedTaskBox: {
    backgroundColor: "#FFA500",
  },
  pendingTaskBox: {
    backgroundColor: "#FFFFFF",
  },
  taskCount: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e3c72",
  },
  taskLabel: {
    marginTop: 4,
    fontSize: 16,
    color: "#1e3c72",
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  chart: {
    borderRadius: 16,
  },
  nextTasksContainer: {
    backgroundColor: "#FF4500",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  nextTasksText: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  footerImageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    color: "black",
  },
  footerImage: {
    width: 100,
    height: 100,
  },
});

export default TaskOverview;
