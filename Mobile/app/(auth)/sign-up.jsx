import * as React from "react";
import { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Image } from "expo-image";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { styles } from "../../assets/styles/auth.js";
import { COLORS } from "../../constants/color.js";
import { Ionicons } from "@expo/vector-icons";
export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err) {
      if(err.error?.[0].code==="form_identifier_exists"){
        setError("that email address is already in use. Please try another.")
      }else{
        setError("An error occured.Please try again")
      }
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        console.error(
          "Verification status:",
          JSON.stringify(signUpAttempt, null, 2)
        );
        setError("Verification incomplete. Please check your code.");
      }
    } catch (err) {
      console.error("Verification error:", JSON.stringify(err, null, 2));
      setError("Invalid verification code. Please try again.");
    }
  };

  return (
    <KeyboardAwareScrollView style={{flex:1}}
    contentContainerStyle={{flexGrow:1}}
    enableOnAndroid={true}
    enableAutomaticScroll={true}
    extraScrollHeight={20}>
      {pendingVerification ? (
        <View style={styles.container}>
        <View style={styles.verificationContainer}>
          <Text style={styles.verificationTitle}>Verify your email</Text>
          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity onPress={() => setError("")}>
                <Ionicons name="close" size={20} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
            
          ) : null}
          <TextInput
            style={[styles.verificationInput, error && styles.errorInput]}
            value={code}
            placeholder="Enter verification code"
            onChangeText={(code) => setCode(code)}
          />
          <TouchableOpacity onPress={onVerifyPress} style={styles.button}>
            <Text style={styles.buttonText}>Verify</Text>
          </TouchableOpacity>
        </View>
        </View>
      ) : (
        
          <View style={styles.container}>
            <Image
              source={require("../../assets/images/revenue-i2.png")}
              style={styles.illustration}
            />
            <Text style={styles.title}>Create Account</Text>
            {error ? (
              <View style={styles.errorBox}>
                <Ionicons
                  name="alert-circle"
                  size={20}
                  color={COLORS.expense}
                />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity onPress={() => setError("")}>
                  <Ionicons name="close" size={20} color={COLORS.textLight} />
                </TouchableOpacity>
              </View>
            ) : null}
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Enter email"
              placeholderTextColor="#9A8478"
              onChangeText={(email) => setEmailAddress(email)}
            />
            <TextInput
              style={[styles.input, error && styles.errorInput]}
              value={password}
              autoCapitalize="none"
              placeholder="Enter password"
              placeholderTextColor="#9A8478"
              onChangeText={(password) => setPassword(password)}
            />
            <TouchableOpacity onPress={onSignUpPress} style={styles.button}>
              <Text style={styles.buttonText}>Sign-UP</Text>
            </TouchableOpacity>
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>Already have an account?</Text>

              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.linkText}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
      
      )}
      {error !== "" && <Text style={styles.error}>{error}</Text>}
    </KeyboardAwareScrollView>
  );
}
