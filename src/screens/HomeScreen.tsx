    import React from 'react';
    import { FlatList, View, Button, StyleSheet } from 'react-native';
    import UserCard from '../components/UserCard';
    import { useSelector, useDispatch } from 'react-redux';
    import { RootState } from '../redux/store';
    import { deleteUser } from '../redux/userSlice';

    const HomeScreen: React.FC = ({ navigation }: any) => {
    const users = useSelector((state: RootState) => state.user.users);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
        <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
            <UserCard
                user={item}
                onEdit={() => navigation.navigate('Form', { userId: item.id })}  /* Pass userId instead of the entire user object */
                onDelete={() => dispatch(deleteUser(item.id))}
                />
            )}
        />
        <Button title="Add User" onPress={() => navigation.navigate('Form')} />
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    });

    export default HomeScreen;