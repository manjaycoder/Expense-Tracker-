import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { Alert, FlatList, Image, RefreshControl, TouchableOpacity } from "react-native";
import { BalanceCard } from "../../components/BalanceCard.jsx";
import { Text, View } from "react-native";
import { SignOutButton } from "@/components/SignOutButton";
import { useTransactions } from "../../hooks/useTransaction.js";
import { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader";
import { styles } from "../../assets/styles/home.js";
import { Ionicons } from "@expo/vector-icons";
import Transactionitem from "../../components/Transactionitem.jsx";
import NoTransactionFound from "../../components/NoTransactionFound.jsx";

export default function Page() {
  const { user } = useUser();
  const {
    transactions,
    summary,
    isLoading,
    loadData,
    deleteTransaction,
  } = useTransactions(user.id);

  useEffect(() => {
    loadData();
  }, [loadData]);
const [refreshing,setRefreshing]=useState(false)
const onRefresh=async()=>{
  setRefreshing(true)
  await loadData();
  setRefreshing(false)
}
  const handleDelete = (id) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteTransaction(id),
        },
      ]
    );
  };

  if (isLoading && !refreshing) return <PageLoader />;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            />
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}
              </Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/Create")}
            >
              <Ionicons name="add-circle" size={20} color="#FFF" />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton />
          </View>
        </View>

        <BalanceCard summary={summary} />

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>

      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => 
          <Transactionitem item={item} onDelete={handleDelete} />
        }ListEmptyComponent={<NoTransactionFound
        />}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
}
