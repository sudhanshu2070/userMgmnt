    import React, { useState } from 'react';
    import { FlatList, View, Button, StyleSheet, TextInput, TouchableOpacity, Text, Modal } from 'react-native';
    import UserCard from '../components/UserCard';
    import { useSelector, useDispatch } from 'react-redux';
    import { RootState } from '../redux/store';
    import { deleteUser } from '../redux/userSlice';
    import { setSortedUsers } from '../redux/userSlice'; // Import the action
    import { IconButton } from 'react-native-paper';
    import Ionicons from 'react-native-vector-icons/Ionicons';
    import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen: React.FC = ({ navigation }: any) => {
    
    const [searchQuery, setSearchQuery] = useState('');
    const [sortVisible, setSortVisible] = useState(false);
    const [sortOption, setSortOption] = useState<string>(''); 

    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.user.users);

    const filteredUsers = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );


    // Sort the filtered users based on selected option
    const sortUsers = (option: string) => {
        setSortOption(option);
        const sortedUsers = [...filteredUsers];

        switch (option) {
            case 'Name (Ascending)':
                sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'Name (Descending)':
                sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'DOB (Youngest)':
                sortedUsers.sort((a, b) => new Date(b.dob).getTime() - new Date(a.dob).getTime());
                break;
            case 'DOB (Oldest)':
                sortedUsers.sort((a, b) => new Date(a.dob).getTime() - new Date(b.dob).getTime());
                break;
            default:
                break;
        }

        dispatch(setSortedUsers(sortedUsers));
        setSortVisible(false); // Closing the sort popup
    };  

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
           
        {/* Searching and Sorting Containers */}
        <View style={styles.headerContainer}>
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
            <TouchableOpacity
                style={styles.sortButtonContainer}
                onPress={() => setSortVisible(true)}
            >
                <Text style={styles.sortPlaceholder}>Sort</Text>
                <Ionicons name="filter" size={20} color="#757575" style={styles.icon} />
            </TouchableOpacity>
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

        {/* Sorting Slide Modal */}
        <Modal visible={sortVisible} transparent animationType="slide">
            <TouchableOpacity style={styles.modalOverlay} onPress={() => setSortVisible(false)}>
                <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Sort by:</Text>
            <TouchableOpacity onPress={() => sortUsers('Name (Ascending)')}>
                <Text style={styles.modalOption}>Name (Ascending)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sortUsers('Name (Descending)')}>
                <Text style={styles.modalOption}>Name (Descending)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sortUsers('DOB (Youngest)')}>
                <Text style={styles.modalOption}>DOB (Youngest)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sortUsers('DOB (Oldest)')}>
                <Text style={styles.modalOption}>DOB (Oldest)</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

        {/* Divider */}
        <View style={styles.divider} />
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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5', 
        borderRadius: 25, 
        paddingHorizontal: 10,
        paddingVertical: 1.5,
        marginVertical: 10,
        marginRight:5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5, 
        elevation: 2, 
        width: '70%', 
        // alignSelf: 'center', 
        height:45,
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
      modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      modalOption: {
        fontSize: 16,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },  
      sortPlaceholder: {
        fontSize: 16,
        color: '#757575', 
        marginRight: 5, 
      },
      headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      sortButtonContainer: {
        width:'17%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 1.5,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        height: 45,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5, 
        elevation: 2, 
      },
      divider: {
        height: 1.5,
        backgroundColor: '#E0E0E0', 
        marginVertical: 7, 
    },
    });

    export default HomeScreen;