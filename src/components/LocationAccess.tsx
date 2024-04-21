import React, {useEffect, useState} from 'react';
import {View, Text, Button, Platform, Alert, StyleSheet} from 'react-native';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

interface LocationAccessProps {
  onLocationPermissionGranted: () => void;
}

const LocationAccess: React.FC<LocationAccessProps> = ({
  onLocationPermissionGranted,
}) => {
  const [permissionChecked, setPermissionChecked] = useState(false);

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    try {
      let permissionStatus = null;
      if (Platform.OS === 'ios') {
        permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      } else {
        permissionStatus = await check(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
      }

      if (permissionStatus === RESULTS.GRANTED) {
        onLocationPermissionGranted();
      } else {
        setPermissionChecked(true);
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
    }
  };

  const requestLocationPermission = async () => {
    try {
      const result = await requestLocation();
      if (result === RESULTS.GRANTED) {
        onLocationPermissionGranted();
      } else {
        Alert.alert(
          'Location Permission Denied',
          'To use this feature, you need to grant location permission.',
          [{text: 'OK', onPress: () => setPermissionChecked(true)}],
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  };

  const requestLocation = async (): Promise<any> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position: GeolocationResponse) => resolve(position),
        (error: any) => reject(error),
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    });
  };

  return (
    <View style={styles.container}>
      {!permissionChecked && (
        <Text style={{color: 'black'}}>Checking location permission...</Text>
      )}
      {permissionChecked && (
        <Button
          title="Grant Location Permission"
          onPress={requestLocationPermission}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocationAccess;
