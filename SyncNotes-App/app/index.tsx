import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, FlatList, Alert, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useNotes, useSetupProject } from '../hooks/useNotes';

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { data: notes, isLoading, isError, refetch } = useNotes();
  const { mutate: setupProject, isPending: isSettingUp } = useSetupProject();

  const handleSetup = () => {
    setupProject(undefined, {
      onSuccess: (data) => {
        Alert.alert('Success', data.message || 'Project setup completed!');
        refetch();
      },
      onError: (error) => {
        Alert.alert('Error', 'Failed to setup project: ' + error.message);
      }
    });
  };

  const filteredNotes = notes?.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading || isSettingUp) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f4511e" />
        <Text style={styles.loadingText}>{isSettingUp ? 'Initializing Database...' : 'Loading Notes...'}</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load notes.</Text>
        <TouchableOpacity style={styles.button} onPress={() => refetch()}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { marginTop: 10, backgroundColor: '#4CAF50' }]} onPress={handleSetup}>
          <Text style={styles.buttonText}>Run Initial Setup</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: 'Sync Notes',
          headerRight: () => (
            <TouchableOpacity 
              style={styles.headerButton} 
              onPress={() => router.push('/notes/add')}
            >
              <Text style={styles.headerButtonText}>+</Text>
            </TouchableOpacity>
          ),
        }} 
      />

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title or subject..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>
      
      {filteredNotes && filteredNotes.length > 0 ? (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.noteCard}
              onPress={() => router.push(`/notes/${item.id}`)}
            >
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteSubject}>{item.subject}</Text>
              <Text style={styles.noteDescription} numberOfLines={2}>
                {item.description}
              </Text>
            </TouchableOpacity>
          )}
          onRefresh={refetch}
          refreshing={isLoading}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.center}>
          <Text style={styles.emptyText}>
            {searchQuery ? 'No matching notes found.' : 'No notes found.'}
          </Text>
          {searchQuery ? (
            <TouchableOpacity style={styles.button} onPress={() => setSearchQuery('')}>
              <Text style={styles.buttonText}>Clear Search</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={() => router.push('/notes/add')}>
                <Text style={styles.buttonText}>Add Your First Note</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, { marginTop: 20, backgroundColor: '#888' }]} 
                onPress={handleSetup}
              >
                <Text style={styles.buttonText}>Initialize DB (One-time)</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInput: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#f4511e',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerButton: {
    marginRight: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 32,
  },
  noteCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  noteSubject: {
    fontSize: 14,
    color: '#f4511e',
    fontWeight: '600',
    marginBottom: 8,
  },
  noteDescription: {
    fontSize: 14,
    color: '#666',
  },
});
