    import React, { useState } from 'react';
    import { FlatList, View, Button, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
    import UserCard from '../components/UserCard';
    import { useSelector, useDispatch } from 'react-redux';
    import { RootState } from '../redux/store';
    import { deleteUser } from '../redux/userSlice';
    import { IconButton } from 'react-native-paper';
    import Ionicons from 'react-native-vector-icons/Ionicons';
    import Icon from 'react-native-vector-icons/MaterialIcons';

    const HomeScreen: React.FC = ({ navigation }: any) => {
    
    const [searchQuery, setSearchQuery] = useState('');

    const users = useSelector((state: RootState) => state.user.users);
    const dispatch = useDispatch();

    const filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );

    // For search icon at the top(in the title bar)  

    // React.useLayoutEffect(() => {
    //     navigation.setOptions({
    //       headerRight: () => (
    //         <IconButton
    //           icon="magnify" 
    //           size={24}
    //           onPress={() => {}}
    //         />
    //       ),
    //     });
    // }, [navigation]);  

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#757575" style={styles.icon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name or email"
                    placeholderTextColor="#BDBDBD"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

        <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <UserCard
                user={item}
                onEdit={() => navigation.navigate('Form', { userId: item.id })}  /* Passing userId*/
                onDelete={() => dispatch(deleteUser(item.id))}
                />
            )}
        />
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('Form')}
            >
            <Icon name="add" size={24} color="#fff" />
            <Text style={styles.addButtonText}>Add User</Text>
          </TouchableOpacity>
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor:'#ffffff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5', 
        borderRadius: 25, 
        paddingHorizontal: 10,
        paddingVertical: 1.5,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5, 
        elevation: 2, 
        width: '95%', // (95% of the container)
        alignSelf: 'center', 
      },
    icon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#212121', 
      },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#219897', 
        paddingVertical: 12,
        borderRadius: 25,
        shadowColor: '#EEEEEE',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 5, 
        marginTop: 15,
        marginBottom: 15,
        marginHorizontal: 20,
        width: '30%', 
        alignSelf: 'center', 
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8, 
      },    
    });

    export default HomeScreen;