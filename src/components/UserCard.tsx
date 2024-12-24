import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { User } from '../redux/types';

interface UserCardProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>
        Name: <Text style={styles.value}>{user.name}</Text>
      </Text>
      <Text style={styles.label}>
        Email: <Text style={styles.value}>{user.email}</Text>
      </Text>
      <Text style={styles.label}>
        DOB: <Text style={styles.value}>{user.dob}</Text>
      </Text>
      <Text style={styles.label}>
        Phone: <Text style={styles.value}>{user.phone}</Text>
      </Text>

      <View style={styles.separator} />

      <View style={styles.actions}>
        <View style={styles.buttonContainer}>
          <Button title="Update" onPress={onEdit} color="#007BFF" />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Delete" onPress={onDelete} color="#FF3B30" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
});

export default UserCard;