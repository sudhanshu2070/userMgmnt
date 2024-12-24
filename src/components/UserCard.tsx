import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
// import { User } from '././src/redux/types';
import { User } from '../redux/types';

interface UserCardProps {
  user: User;
  onEdit: () => void;
  onDelete: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>DOB: {user.dob}</Text>
      <Text>Phone: {user.phone}</Text>
      <View style={styles.actions}>
        <Button title="Edit" onPress={onEdit} />
        <Button title="Delete" onPress={onDelete} color="red" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default UserCard;