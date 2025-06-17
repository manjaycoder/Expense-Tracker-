import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";


const API_URL = "http://localhost:5001/api";

export const useTransactions = (userId) => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ balance: 0, income: 0, expense: 0 });
  const [isLoading, setIsLoading] = useState(false); 

  const fetchTransactions = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`${API_URL}/transactions/${userId}`);
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      Alert.alert("Error", "Failed to fetch transactions");
    }
  }, [userId]);

  const fetchSummary = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`${API_URL}/transactions/summary/${userId}`);
      setSummary(response.data);
    } catch (error) {
      console.error("Error fetching summary:", error);
      Alert.alert("Error", "Failed to fetch summary");
    }
  }, [userId]);

  const loadData = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      await Promise.all([fetchTransactions(), fetchSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);
      Alert.alert("Error", "Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [fetchTransactions, fetchSummary, userId]);

  const deleteTransaction = useCallback(async (id) => {
    try {
      await axios.delete(`${API_URL}/transactions/${id}`);
      await loadData();
      Alert.alert("Success", "Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      Alert.alert("Error", error?.response?.data?.message || "Failed to delete transaction");
    }
  }, [loadData]);

  // Optional: Auto-load data when userId changes
  useEffect(() => {
    if (userId) {
      loadData();
    }
  }, [userId, loadData]);

  return {
    transactions,
    summary,
    isLoading,
    loadData,
    deleteTransaction,
  };
};
