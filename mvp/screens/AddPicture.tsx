import { StyleSheet, Button, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import Footer from '../components/Footer'
import { Camera, CameraType } from 'expo-camera'
import { useState, useEffect, useRef } from 'react'
import * as ImageManipulator from 'expo-image-manipulator';
import { UserCoords } from '../Type';
import * as Location from 'expo-location';
import AddPictureMenu from './AddPictureMenu'
import * as ScreenOrientation from 'expo-screen-orientation';
import TakePicture from './TakePicture';
import PostPicture from './PostPicture';
import PostingMessage from './PostingMessage';

const AddPicture = ({
  publicKey,
  dappKeyPair,
  profile,
  phantomWalletPublicKey,
  session,
  sharedSecret,
  deepLink,
  setDeepLink,
  transactionSuccess,
  setTransactionSuccess,
}: any) => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean>(true);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState<any>();
  const [capturedImage, setCapturedImage] = useState();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [pictureSaved, setPictureSaved] = useState(false);
  const [pictureLocation, setPictureLocation] = useState<UserCoords>();
  const [posted, setPosted] = useState(false);
  const [errorMsgPicture, setErrorMsgPicture] = useState("");
  const [mintingOver, setMintingOver] = useState(false);

  const openCamera = async () => {
    const cameraPermission = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cameraPermission.status === "granted");
    if (hasCameraPermission === true) {
      setCameraOpen(true);
    } else if (!hasCameraPermission) {
      return (
        <Text>
          Permission for camera not granted. Please change this in settings.
        </Text>
      );
    }
  };
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync({
        base64: true,
        quality: 0.3,
      });
      setPreviewVisible(true);
      if (type === "front") {
        const manipPhoto = await ImageManipulator.manipulateAsync(photo.uri, [
          { flip: ImageManipulator.FlipType.Horizontal },
        ]);
        manipPhoto.base64 = photo.base64;
        setCapturedImage(manipPhoto as any);
      } else {
        setCapturedImage(photo as any);
      }
    }
  };
  const retakePicture = () => {
    // setCapturedImage()
    setPreviewVisible(false);
    openCamera();
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsgPicture("Permission to access location was denied");
        return;
      }
      let location: UserCoords = await Location.getCurrentPositionAsync({});
      setPictureLocation(location);
    })();
  }, []);
  return (
    <>
      {cameraOpen ? (
        <TakePicture
          toggleCameraType={toggleCameraType}
          camera={camera!}
          setCamera={setCamera}
          takePicture={takePicture}
          setPictureSaved={setPictureSaved}
          previewVisible={previewVisible}
          capturedImage={capturedImage}
          retakePicture={retakePicture}
          type={type}
          setCameraOpen={setCameraOpen}
        />
      ) : pictureSaved ? (
        <PostPicture
          capturedImage={capturedImage}
          pictureLocation={pictureLocation}
          publicKey={publicKey}
          dappKeyPair={dappKeyPair}
          profile={profile}
          setPosted={setPosted}
          setPictureSaved={setPictureSaved}
          phantomWalletPublicKey={phantomWalletPublicKey}
          session={session}
          sharedSecret={sharedSecret}
          setDeepLink={setDeepLink}
          transactionSuccess={transactionSuccess}
          setTransactionSuccess={setTransactionSuccess}

        />
      ) : posted ? (
        <PostingMessage
          setMintingOver={setMintingOver}
          mintingOver={mintingOver}
          setPosted={setPosted}
        />
      ) : (
        <AddPictureMenu openCamera={openCamera} mintingOver={mintingOver} />
      )}
    </>
  );
};

export default AddPicture;