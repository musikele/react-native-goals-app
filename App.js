import { useState } from 'react';

import { Button, FlatList, StyleSheet, View } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/Goalnput';
import { StatusBar } from 'expo-status-bar';

export default function App() {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [courseGoals, setCourseGoals] = useState([]);

    function startAddGoalHandler() {
        setModalIsVisible(true);
    }

    function endAddGoalHandler() {
        setModalIsVisible(false);
    }

    function deleteItem(id) {
        console.log(id);
        setCourseGoals((currentGoals) => {
            console.log(currentGoals);
            return currentGoals.filter((goal) => goal.key !== id);
        });
    }

    function addGoalHandler(enteredGoalTextState) {
        setCourseGoals((currentCourseGoals) => [
            ...currentCourseGoals,
            { text: enteredGoalTextState, key: Math.random().toString() },
        ]);
        endAddGoalHandler();
    }

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.appContainer}>
                <Button
                    title="Add new Goal"
                    color="#5e0acc"
                    onPress={startAddGoalHandler}
                ></Button>
                <GoalInput
                    visible={modalIsVisible}
                    onAddGoal={addGoalHandler}
                    onCancel={endAddGoalHandler}
                />
                <View style={styles.goalsContainer}>
                    <FlatList
                        data={courseGoals}
                        renderItem={(itemData) => {
                            return (
                                <GoalItem
                                    text={itemData.item.text}
                                    onDeleteItem={deleteItem}
                                    id={itemData.item.key}
                                />
                            );
                        }}
                        alwaysBounceVertical={false}
                    />
                </View>
            </View>
        </>
    );
}

// using StyleSheet.create mainly for autocompletion and validation
const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
    },

    goalsContainer: {
        flex: 5,
        marginTop: 24,
    },
});
