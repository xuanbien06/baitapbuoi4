import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { saveStudent, updateStudent } from '../database/storage';
import i18n from '../locales/i18n';

export default function EditScreen({ route, navigation }) {
  const existingStudent = route.params?.student || null;
  
  const [name, setName] = useState(existingStudent ? existingStudent.name : '');
  const [studentId, setStudentId] = useState(existingStudent ? existingStudent.studentId : '');
  const [email, setEmail] = useState(existingStudent ? existingStudent.email : '');
  const [avatar, setAvatar] = useState(existingStudent ? existingStudent.avatar : null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      legacy: true,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    // 1. Kiểm tra để trống từng ô
    if (!name.trim()) {
      return Alert.alert("Lỗi", "Bạn chưa nhập Họ tên sinh viên!");
    }
    if (!studentId.trim()) {
      return Alert.alert("Lỗi", "Bạn chưa nhập Mã số sinh viên!");
    }
    
    // 2. Kiểm tra định dạng Mã Sinh Viên 
    // Quy tắc: B + 2 chữ cái (A-Z) + 2 số (22-30) + 4 số (0-9)
    const idRegex = /^B[A-Z]{2}(2[2-9]|30)\d{4}$/;
    if (!idRegex.test(studentId)) {
      return Alert.alert(
        "Lỗi định dạng Mã SV", 
        "Mã SV không hợp lệ!\nVí dụ mẫu chuẩn: BIT240041"
      );
    }

    if (!email.trim()) {
      return Alert.alert("Lỗi", "Bạn chưa nhập Email!");
    }

    // 3. Kiểm tra định dạng Email theo Mã Sinh Viên
    const expectedEmail = `${studentId.toLowerCase()}@st.cmcu.edu.vn`;
    if (email.toLowerCase() !== expectedEmail) {
      return Alert.alert(
        "Lỗi định dạng Email", 
        `Email phải bắt đầu bằng mã số sinh viên.\nĐịnh dạng đúng của bạn là: ${expectedEmail}`
      );
    }

    const studentData = {
      id: existingStudent ? existingStudent.id : Date.now().toString(),
      name,
      studentId,
      email,
      avatar
    };

    if (existingStudent) {
      Alert.alert(
        "Xác nhận",
        i18n.t('confirmMsg'),
        [
          { text: i18n.t('no'), style: "cancel" },
          { 
            text: i18n.t('yes'), 
            onPress: async () => {
              await updateStudent(studentData);
              navigation.goBack();
            } 
          }
        ]
      );
    } else {
      await saveStudent(studentData);
      navigation.goBack();
    }
  };

  return (
    // Sử dụng ScrollView thay cho View để cuộn được khi bàn phím đẩy lên
    <ScrollView style={styles.container}>
      {avatar && <Image source={{ uri: avatar }} style={styles.avatar} />}
      <View style={styles.imgBtn}>
        <Button title={i18n.t('pickImage')} onPress={pickImage} />
      </View>
      
      <TextInput 
        style={styles.input} 
        placeholder={i18n.t('name')} 
        value={name} 
        onChangeText={setName} 
      />
      
      <TextInput 
        style={styles.input} 
        placeholder={i18n.t('studentId')} 
        value={studentId} 
        onChangeText={(text) => setStudentId(text.toUpperCase())} // Tự động viết hoa để tránh lỗi regex
      />
      
      <TextInput 
        style={styles.input} 
        placeholder={i18n.t('email')} 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address"
        autoCapitalize="none" // Không tự động viết hoa chữ cái đầu của email
      />
      
      <View style={styles.saveBtn}>
        <Button title={i18n.t('save')} onPress={handleSave} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 15, borderRadius: 5, marginTop: 5, fontSize: 16 },
  avatar: { width: 120, height: 120, borderRadius: 60, alignSelf: 'center', marginBottom: 15 },
  imgBtn: { marginBottom: 20 },
  saveBtn: { marginTop: 10, marginBottom: 40 }
});