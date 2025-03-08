import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { api, Task } from '../services/api';
import { colors } from '../constants/colors';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import { icons } from '../assets/icons';

export const TaskListScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await api.getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      Alert.alert('Error', 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    try {
      const newTask = await api.createTask({ title, description });
      setTasks([...tasks, newTask]);
      setTitle('');
      setDescription('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create task');
    }
  };

  const handleToggleComplete = async (task: Task) => {
    try {
      await api.updateTask(task.id, { completed: !task.completed });
      setTasks(tasks.map(t => 
        t.id === task.id ? { ...t, completed: !t.completed } : t
      ));
    } catch (error) {
      Alert.alert('Error', 'Failed to update task');
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete task');
    }
  };

  const renderItem = ({ item }: { item: Task }) => (
    <Card variant="elevated" style={styles.taskCard}>
      <View style={styles.taskContent}>
        <Button
          onPress={() => handleToggleComplete(item)}
          variant="outline"
          size="small"
          style={styles.checkButton}
        >
          {item.completed ? icons.check({}) : icons.uncheck({})}
        </Button>
        <View style={styles.taskText}>
          <Input
            value={item.title}
            editable={false}
            style={[styles.taskTitle, item.completed && styles.completedText]}
          />
          {item.description ? (
            <Input
              value={item.description}
              editable={false}
              style={styles.taskDescription}
            />
          ) : null}
        </View>
        <Button
          onPress={() => handleDeleteTask(item.id)}
          variant="danger"
          size="small"
          style={styles.deleteButton}
        >
          {icons.delete({})}
        </Button>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Card variant="outlined" style={styles.inputCard}>
        <Input
          label="Task Title"
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
          leftIcon={icons.edit({})}
        />
        <Input
          label="Description (Optional)"
          placeholder="Enter task description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
          leftIcon={icons.edit({})}
        />
        <Button
          title="Add Task"
          onPress={handleAddTask}
          loading={loading}
          leftIcon={icons.add({})}
        />
      </Card>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background.primary,
  },
  inputCard: {
    marginBottom: 16,
  },
  list: {
    flex: 1,
  },
  taskCard: {
    marginBottom: 8,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    flex: 1,
    marginHorizontal: 12,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: colors.text.tertiary,
  },
  taskDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  checkButton: {
    padding: 0,
    borderWidth: 0,
  },
  deleteButton: {
    padding: 8,
  },
}); 