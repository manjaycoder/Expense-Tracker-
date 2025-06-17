import { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { API_URL } from "../../constants/api";
import { useUser } from "@clerk/clerk-expo";
import { styles } from "../../assets/styles/create.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/color";
import { Axios } from "axios";
const CATEGORY = [
  { id: "food", name: "Food & Drinks", icon: "fast-food" },
  { id: "shopping", name: "Shopping", icon: "cart" },
  { id: "transportation", name: "Transportation", icon: "car" },
  { id: "entertainment", name: "Entertainment", icon: "film" },
  { id: "bills", name: "Bills", icon: "cash" },
  { id: "income", name: "Income", icon: "ellipsis-horizontal" },
];

const Create = () => {
  const router = useRouter();
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isExpense, setIsExpense] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) {
      return Alert.alert("Error", "Please enter a transaction title");
    }

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return Alert.alert("Error", "Please enter a valid amount");
    }

    if (!selectedCategory) {
      return Alert.alert("Error", "Please select a category");
    }

    setIsLoading(true);
    try {
      const formattedAmount = isExpense
        ? -Math.abs(parseFloat(amount))
        : Math.abs(parseFloat(amount));

      const response = await fetch(`${API_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if needed
          // "Authorization": `Bearer ${your_token}`,
        },
        body: JSON.stringify({
          user_id: user?.id,
          tittle: title.trim(),
          amount: formattedAmount,
          category: selectedCategory,
         
        }),
      });
useEffect(() => {
  Axios.get(`${API_URL}/transactions`)
    .then(res => console.log("✅ Backend OK", res.data))
    .catch(err => console.log("❌ Backend Error", err.message));
}, []);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to create transaction");
      }

      Alert.alert("Success", "Transaction created successfully", [
        {
          text: "OK",
          onPress: () => {
            setTitle("");
            setAmount("");
            setSelectedCategory("");
            router.replace("/"); 
          },
        },
      ]);
    } catch (error) {
      console.error("Transaction Error:", error);
      Alert.alert(
        "Error",
        error.message || "Network error. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          disabled={isLoading}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>New Transaction</Text>

        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
          onPress={handleCreate}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <>
              <Ionicons name="checkmark" size={18} color="#FFF" />
              <Text style={styles.saveButton}>Save</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        {/* Transaction Type Selector */}
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, isExpense && styles.typeButtonActive]}
            onPress={() => !isLoading && setIsExpense(true)}
            disabled={isLoading}
          >
            <Ionicons
              name="arrow-down-circle"
              size={22}
              color={isExpense ? COLORS.white : COLORS.expense}
              style={styles.typeIcon}
            />
            <Text
              style={[
                styles.typeButtonText,
                isExpense && styles.typeButtonTextActive,
              ]}
            >
              Expense
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
            onPress={() => !isLoading && setIsExpense(false)}
            disabled={isLoading}
          >
            <Ionicons
              name="arrow-up-circle"
              size={22}
              color={!isExpense ? COLORS.white : COLORS.income}
              style={styles.typeIcon}
            />
            <Text
              style={[
                styles.typeButtonText,
                !isExpense && styles.typeButtonTextActive,
              ]}
            >
              Income
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount Input */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>&#8377;</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0.00"
            placeholderTextColor={COLORS.textLight}
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            editable={!isLoading}
          />
        </View>

        {/* Title Input */}
        <View style={styles.inputContainer}>
          <Ionicons
            name="create-outline"
            size={22}
            color={COLORS.textLight}
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Transaction Title"
            placeholderTextColor={COLORS.textLight}
            value={title}
            onChangeText={setTitle}
            editable={!isLoading}
            maxLength={50}
          />
        </View>

        {/* Category Selection */}
        <Text style={styles.sectionTitle}>
          <Ionicons name="pricetag-outline" size={16} color={COLORS.text} />
          Category
        </Text>
        <View style={styles.categoryGrid}>
          {CATEGORY.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.name && styles.categoryButtonActive,
              ]}
              onPress={() => !isLoading && setSelectedCategory(category.name)}
              disabled={isLoading}
            >
              <Ionicons
                name={category.icon}
                size={20}
                color={
                  selectedCategory === category.name ? COLORS.white : COLORS.text
                }
              />
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category.name && styles.categoryButtonTextActive,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </View>
  );
};

export default Create;