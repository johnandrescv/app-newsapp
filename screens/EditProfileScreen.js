import React, { useState, createRef }  from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ImgPicker from '../components/ImgPicker';
import MainButton from '../components/MainButton';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ActionSheet from 'react-native-actionsheet'
import * as editActions from '../store/actions/user';
import { editRequest } from '../services/request';
import Loading from '../components/Loading';

const EditProfileScreen = props => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    const [name, setName] = useState(user.name);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const actionSheet = createRef();

    const verifyPermissions = async (perm) => {
        const result = await Permissions.askAsync(perm);
        if (result.status !== 'granted') {
          Alert.alert(
            'Insufficient permissions!',
            'You need to grant camera or gallery permissions to use this app.',
            [{ text: 'Okay' }]
          );
          return false;
        }
        return true;
      };
    
    const takeImageHandler = async (type) => {
        if(type === 2){
            return;
        }
        const hasPermission = (type === 0) ? await verifyPermissions(Permissions.CAMERA) : await verifyPermissions(Permissions.CAMERA_ROLL);

        if (!hasPermission) {
            return;
        }

        let pickerImage;
        
        if(type === 0){
            pickerImage = await ImagePicker.launchCameraAsync({
                quality: 0.5,
                base64: true
            });
        }else{
            pickerImage = await ImagePicker.launchImageLibraryAsync({
                quality: 0.5,
                base64: true
            });
        }

        setImage(pickerImage.base64);
    };

    const nameChangeHandler = text => {
        setName(text);
    };

    showActionSheet = () => {
        actionSheet.current.show()
    }

    const saveChangesHandler = async () => {
        setIsLoading(true);
        const editData = await editRequest(user.id, user.type, name, image)
        if(editData){
            setIsLoading(false);
            dispatch(editActions.saveUser(editData));
            props.navigation.pop();
        }
        setIsLoading(false);
    }

    if (isLoading) {
        return <Loading />;
    }

    return(
        <ScrollView>
            <View style={styles.form}>
                <MainButton btnText="Change Profile Image" onClick={showActionSheet} />
                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.textInput} onChangeText={nameChangeHandler} value={name} />
                <ImgPicker imagePreview={image} />
                <MainButton btnText="Save Changes" onClick={saveChangesHandler} />
                <ActionSheet
                    ref={actionSheet}
                    options={['Camera', 'Gallery', 'Cancel']}
                    cancelButtonIndex={2}
                    onPress={(index) => { takeImageHandler(index); }}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
      margin: 20
    },
    label: {
      fontSize: 18,
      marginBottom: 1,
      fontFamily: 'open-sans-bold'
    },
    textInput: {
      borderBottomColor: '#ccc',
      borderBottomWidth: 1,
      marginBottom: 15,
      paddingVertical: 4,
      paddingHorizontal: 2,
      fontFamily: 'open-sans'
    }
  });

export default EditProfileScreen;