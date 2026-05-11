import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useNotes, useDeleteNote } from '../../hooks/useNotes';

export default function NoteDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { data: notes, isLoading } = useNotes();
  const { mutate: deleteNote, isPending: isDeleting } = useDeleteNote();

  const note = notes?.find(n => n.id.toString() === id);

  const handleDelete = () => {
    Alert.alert(
      'Delete Note',
      'Are you sure you want to delete this note?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            deleteNote(Number(id), {
              onSuccess: () => {
                Alert.alert('Success', 'Note deleted successfully');
                router.back();
              },
              onError: (error) => {
                Alert.alert('Error', 'Failed to delete note: ' + error.message);
              }
            });
          }
        }
      ]
    );
  };

  if (isLoading || isDeleting) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f4511e" />
      </View>
    );
  }

  if (!note) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Note not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Note Details',
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => router.push({ pathname: '/notes/edit', params: { id: note.id } })}
            >
              <Text style={styles.headerActionText}>Edit</Text>
            </TouchableOpacity>
          )
        }} 
      />

      <View style={styles.content}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.subject}>{note.subject}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.description}>{note.description}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.date}>Created: {new Date(note.created_at).toLocaleDateString()}</Text>
          <Text style={styles.date}>Updated: {new Date(note.updated_at).toLocaleDateString()}</Text>
        </View>

        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={handleDelete}
        >
          <Text style={styles.deleteButtonText}>Delete Note</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subject: {
    fontSize: 18,
    color: '#f4511e',
    fontWeight: '600',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 30,
  },
  footer: {
    marginBottom: 30,
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  headerActionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  deleteButton: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: '#666',
  },
});
