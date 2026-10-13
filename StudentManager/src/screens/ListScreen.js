import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Modal, StyleSheet, Alert, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getStudents, deleteStudent } from '../database/storage';
import i18n from '../locales/i18n';

export default function ListScreen({ navigation }) {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  // State phụ để ép màn hình load lại khi đổi ngôn ngữ
  const [locale, setLocale] = useState(i18n.locale);

  const loadData = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const changeLanguage = (lang) => {
    i18n.locale = lang;
    setLocale(lang); // Ép render lại
    navigation.setOptions({ title: i18n.t('listTitle') }); // Đổi title thanh header
  };

  const handleDelete = (id) => {
    Alert.alert(
      i18n.t('delete'),
      i18n.t('confirmMsg'),
      [
        { text: i18n.t('no'), style: "cancel" },
        { 
          text: i18n.t('yes'), 
          onPress: async () => {
            await deleteStudent(id);
            setModalVisible(false);
            loadData();
          } 
        }
      ]
    );
  };

  const openDetail = (student) => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => openDetail(item)}>
      {item.avatar ? <Image source={{ uri: item.avatar }} style={styles.avatar} /> : <View style={styles.avatarPlaceholder} />}
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text>{item.studentId}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Nút chuyển đổi ngôn ngữ */}
      <View style={styles.langContainer}>
        <TouchableOpacity style={styles.langBtn} onPress={() => changeLanguage('vi')}>
          <Text style={styles.langText}>🇻🇳 VN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.langBtn} onPress={() => changeLanguage('en')}>
          <Text style={styles.langText}>🇬🇧 EN</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách sinh viên (tự động cuộn nhờ flex: 1) */}
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        style={styles.list}
      />

      {/* Nút Thêm mới được cố định ở đáy màn hình */}
      <View style={styles.bottomBtnContainer}>
        <Button title={i18n.t('addStudent')} onPress={() => navigation.navigate('Edit')} />
      </View>

      {/* Dialog chi tiết sinh viên */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{i18n.t('details')}</Text>
            
            {selectedStudent && (
              <View style={{ alignItems: 'center', width: '100%' }}>
                {selectedStudent.avatar ? (
                  <Image source={{ uri: selectedStudent.avatar }} style={styles.modalAvatar} />
                ) : null}
                <Text>{i18n.t('name')}: {selectedStudent.name}</Text>
                <Text>{i18n.t('studentId')}: {selectedStudent.studentId}</Text>
                <Text>{i18n.t('email')}: {selectedStudent.email}</Text>
              </View>
            )}
            
            <View style={styles.buttonRow}>
              <Button title={i18n.t('edit')} onPress={() => {
                setModalVisible(false);
                navigation.navigate('Edit', { student: selectedStudent });
              }} />
              <Button 
                title={i18n.t('delete')} 
                color="red" 
                onPress={() => {
                  if (selectedStudent) handleDelete(selectedStudent.id);
                }} 
              />
              <Button title={i18n.t('close')} color="gray" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  langContainer: { flexDirection: 'row', justifyContent: 'flex-end', padding: 10, backgroundColor: 'white' },
  langBtn: { paddingHorizontal: 10, paddingVertical: 5, marginLeft: 10, backgroundColor: '#ddd', borderRadius: 5 },
  langText: { fontWeight: 'bold' },
  list: { flex: 1, paddingHorizontal: 20 }, // flex: 1 giúp list chiếm hết khoảng trống giữa màn hình và tự cuộn được
  item: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: '#ccc', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  avatarPlaceholder: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ccc', marginRight: 15 },
  name: { fontSize: 18, fontWeight: 'bold' },
  bottomBtnContainer: { padding: 20, backgroundColor: 'white', borderTopWidth: 1, borderColor: '#eee' }, // Đóng khung nút ở đáy
  modalContainer: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 },
  modalContent: { backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  modalAvatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 20 }
});