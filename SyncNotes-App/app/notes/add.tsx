import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useCreateNote } from "../../hooks/useNotes";

export default function AddNote() {
  const router = useRouter();
  const { mutate: createNote, isPending } = useCreateNote();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const subjectRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  const handleSave = () => {
    if (!title || !subject || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    createNote(
      { title, subject, description },
      {
        onSuccess: () => {
          Alert.alert("Success", "Note added successfully");
          router.back();
        },
        onError: (error) => {
          Alert.alert("Error", "Failed to add note: " + error.message);
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Add New Note" }} />

      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardOpeningTime={0}
        extraScrollHeight={100}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter title"
            value={title}
            onChangeText={setTitle}
            returnKeyType="next"
            onSubmitEditing={() => subjectRef.current?.focus()}
            editable={!isPending}
          />

          <Text style={styles.label}>Subject</Text>
          <TextInput
            ref={subjectRef}
            style={styles.input}
            placeholder="Enter subject"
            value={subject}
            onChangeText={setSubject}
            returnKeyType="next"
            onSubmitEditing={() => descriptionRef.current?.focus()}
            editable={!isPending}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            ref={descriptionRef}
            style={[styles.input, styles.textArea]}
            placeholder="Enter description"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
            returnKeyType="done"
            onSubmitEditing={() => descriptionRef.current?.blur()}
            editable={!isPending}
          />

          <TouchableOpacity
            style={[styles.button, isPending && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Save Note</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    // paddingBottom: 80,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    height: 120,
  },
  button: {
    backgroundColor: "#f4511e",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#ffa07a",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
