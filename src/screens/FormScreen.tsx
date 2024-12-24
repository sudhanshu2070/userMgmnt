import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser } from '../redux/userSlice';
import { RootState } from '../redux/store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { isValidEmail, isValidPhone } from '../utils/validation';

type FormScreenProps = NativeStackScreenProps<any, 'Form'>;

const FormScreen: React.FC<FormScreenProps> = ({ navigation, route }) => {
  const { userId } = route.params || {};
  
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) =>
    state.user.users.find((u) => u.id === userId)
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setDob(user.dob);
      setPhone(user.phone);
    }
  }, [user]);

  const validateFields = () => {
    if (!name || !email || !dob || !phone) {
      Alert.alert('Validation Error', 'All fields are required.');
      return false;
    }
    
    if (!isValidEmail(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return false;
    }
    if (!isValidPhone(phone)) {
      Alert.alert('Validation Error', 'Phone number must be 10 digits.');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateFields()) return;

    if (user) {
      // Updating existing user
      dispatch(updateUser({ id: user.id, name, email, dob, phone }));
      Alert.alert('Success', 'User updated successfully.');
    } else {
      // Adding new user
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        dob,
        phone,
      };
      dispatch(addUser(newUser));
      Alert.alert('Success', 'User added successfully.');
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter name"
      />
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        keyboardType="email-address"
      />
      <Text style={styles.label}>Date of Birth</Text>
      <TextInput
        style={styles.input}
        value={dob}
        onChangeText={setDob}
        placeholder="YYYY-MM-DD"
      />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter phone number"
        keyboardType="number-pad"
      />
      <Button
        title={user ? 'Update' : 'Add'}
        onPress={handleSubmit}
        color="#007BFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default FormScreen;