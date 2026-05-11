import React, { useState, useEffect, useRef } from "react";
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
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNotes, useUpdateNote } from "../../hooks/useNotes";

export default function EditNote() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: notes, isLoading: isFetching } = useNotes();
  const { mutate: updateNote, isPending: isUpdating } = useUpdateNote();

  const note = notes?.find((n) => n.id.toString() === id);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const subjectRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setSubject(note.subject);
      setDescription(note.description);
    }
  }, [note]);

  const handleSave = () => {
    if (!title || !subject || !description) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    updateNote(
      { id: Number(id), title, subject, description },
      {
        onSuccess: () => {
          Alert.alert("Success", "Note updated successfully");
          router.back();
        },
        onError: (error) => {
          Alert.alert("Error", "Failed to update note: " + error.message);
        },
      },
    );
  };

  if (isFetching) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Edit Note" }} />

      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        enableOnAndroid={true}
        enableAutomaticScroll={true}
        keyboardOpeningTime={0}
        extraScrollHeight={100}
        keyboardShouldPersistTaps="handled"
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
            editable={!isUpdating}
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
            editable={!isUpdating}
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
            editable={!isUpdating}
          />

          <TouchableOpacity
            style={[styles.button, isUpdating && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Update Note</Text>
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
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    flexGrow: 1,
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
