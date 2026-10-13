import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@students_data';

export const getStudents = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error(e);
    return [];
  }
};

export const saveStudent = async (student) => {
  const students = await getStudents();
  students.push(student);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(students));
};

export const updateStudent = async (updatedStudent) => {
  const students = await getStudents();
  const newData = students.map(s => s.id === updatedStudent.id ? updatedStudent : s);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};

export const deleteStudent = async (id) => {
  const students = await getStudents();
  const newData = students.filter(s => s.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};