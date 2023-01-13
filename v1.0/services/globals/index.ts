import { PublicKey } from '@solana/web3.js'
import nacl from 'tweetnacl'
import { atom } from "jotai";
import { INFT, IProfile, ILocation, coordinates } from '../../Types';
import { CameraCapturedPicture } from 'expo-camera';

export const atomDeepLink = atom("");
export const atomDappKeyPair = atom(nacl.box.keyPair());
export const atomSharedSecret = atom<Uint8Array | string>("");
export const atomSession = atom("");
export const atomPhantomWalletPublicKey = atom<PublicKey | string>("");
export const atomActiveScreen = atom("Home");
export const atomUserNFTs = atom<INFT[]>([]);
export const atomProfile = atom<IProfile[]>([]);
export const atomUserLocation = atom<ILocation>({} as ILocation);
export const atomRefreshLoc = atom<boolean>(false);
export const atomPic = atom<string>("");
export const atomKeepPic = atom<boolean>(false);
export const atomPin = atom<coordinates>({} as coordinates);
export const atomPinCity = atom<string>("");
export const atomDescription = atom<string>("");
export const atomTransacSuccess = atom<boolean>(false);
export const atomDataPic = atom<CameraCapturedPicture>({} as CameraCapturedPicture);
export const atomMintingOver = atom<boolean>(false);
export const atomMintLogs = atom<string[]>([]);
export const atomRegex = atom<RegExp>(new RegExp(/(\s*([\0\b\'\"\n\r\t\%\_\\]*\s*(((select\s*.+\s*from\s*.+)|(insert\s*.+\s*into\s*.+)|(update\s*.+\s*set\s*.+)|(delete\s*.+\s*from\s*.+)|(drop\s*.+)|(truncate\s*.+)|(alter\s*.+)|(exec\s*.+)|(\s*(all|any|not|and|between|in|like|or|some|contains|containsall|containskey)\s*.+[\=\>\<=\!\~]+.+)|(let\s+.+[\=]\s*.*)|(begin\s*.*\s*end)|(\s*[\/\*]+\s*.*\s*[\*\/]+)|(\s*(\-\-)\s*.*\s+)|(\s*(contains|containsall|containskey)\s+.*)))(\s*[\;]\s*)*)+)/i));
export const atomDisplay = atom<string>("Notifications");

export const mapStyle = [
   {
      "elementType": "geometry",
      "stylers": [
         {
            "color": "#212121"
         }
      ]
   },
   {
      "elementType": "labels.icon",
      "stylers": [
         {
            "visibility": "off"
         }
      ]
   },
   {
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#757575"
         }
      ]
   },
   {
      "elementType": "labels.text.stroke",
      "stylers": [
         {
            "color": "#212121"
         }
      ]
   },
   {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
         {
            "color": "#757575"
         }
      ]
   },
   {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#9e9e9e"
         }
      ]
   },
   {
      "featureType": "administrative.land_parcel",
      "stylers": [
         {
            "visibility": "off"
         }
      ]
   },
   {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#bdbdbd"
         }
      ]
   },
   {
      "featureType": "poi",
      "stylers": [
         {
            "saturation": -55
         },
         {
            "lightness": -45
         }
      ]
   },
   {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#757575"
         }
      ]
   },
   {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
         {
            "color": "#181818"
         }
      ]
   },
   {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#616161"
         }
      ]
   },
   {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
         {
            "color": "#1b1b1b"
         }
      ]
   },
   {
      "featureType": "road",
      "stylers": [
         {
            "color": "#00db0f"
         },
         {
            "saturation": -70
         },
         {
            "lightness": -25
         }
      ]
   },
   {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
         {
            "color": "#2c2c2c"
         }
      ]
   },
   {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#8a8a8a"
         }
      ]
   },
   {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
         {
            "color": "#373737"
         }
      ]
   },
   {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
         {
            "color": "#3c3c3c"
         }
      ]
   },
   {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
         {
            "color": "#4e4e4e"
         }
      ]
   },
   {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#616161"
         }
      ]
   },
   {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#757575"
         }
      ]
   },
   {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
         {
            "color": "#000000"
         }
      ]
   },
   {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
         {
            "color": "#3d3d3d"
         }
      ]
   }
]



