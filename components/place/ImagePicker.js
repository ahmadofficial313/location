import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { useEffect, useState } from "react";
import { Alert, Button, View, Image, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import OutlineButton from "../UI/OutlineButton";

function ImagePicker({ onTakeImage }) {
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();
  const [pickedImage, setPickedImage] = useState();
useEffect(()=>{
  onTakeImage(pickedImage);
},[pickedImage, setPickedImage])


  async function verifyPermission() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionRespone = await requestPermission();

      return permissionRespone.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant camera permission to use this app"
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    if (!image.canceled) {
      setPickedImage(image.assets[0].uri);
    }
  }

  let img = <Text>No image taken yet</Text>;

  if (pickedImage) {
    img = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{img}</View>
      <OutlineButton name="camera" onPress={takeImageHandler}>
        Take Image
      </OutlineButton>
    </View>
  );
}
export default ImagePicker;
const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: Colors.primary100,
  },
 
  image: {
    width: "100%",
    height: "100%",
  },
});
