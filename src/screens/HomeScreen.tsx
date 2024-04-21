import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  ImageSourcePropType,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import {Colors, Fontsize, Spacing, Typography} from '../theme';
import CircularProgress from '../components/CircularProgress';
import Tabs from '../components/Tabs';
import {cardsData, propertyData, tabs} from '../Utils/Constants';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation'; // Import Geolocation

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [amenity, setAmenity] = useState('restaurant');
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState('Work');

  const handleLabelPress = (label: string) => {
    setSelectedLabel(label);
  };
  const handleTabPress = (index: number) => {
    setActiveTab(index);
  };
  const labels = ['Work', 'School', 'Hospitals', 'Shopping'];

  const renderLabel = ({item}: {item: string}) => (
    <TouchableOpacity
      style={[
        styles.labelButton,
        selectedLabel === item && styles.selectedLabel,
      ]}
      onPress={() => handleLabelPress(item)}>
      <Text style={styles.labelText}>{item}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = () => {
    Geolocation.requestAuthorization(); // Request location permission
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(position?.coords?.latitude || 0);
        setLongitude(position?.coords?.longitude || 0);
      },
      error => console.error(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }, []);

  useEffect(() => {
    if (latitude !== 0 && longitude !== 0) {
      fetchNearbyPlaces();
    }
  }, [latitude, longitude, selectedLabel]);

  const fetchNearbyPlaces = async () => {
    try {
      const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'fsq37mVs1bBDU06pS6hzKW37mwRcyOwDv3wpqmblrbrsdeQ=',
        },
      };

      const url = `https://api.foursquare.com/v3/places/search?ll=${latitude},${longitude}&query=${selectedLabel}&radius=1000`;

      const response = await axios.get(url, options);
      const RES = response?.data?.results;
      console.log('RES', RES);
      if (response.status === 200) {
        // Extracting nearby places from the response
        const places = RES.map((item: any) => ({
          name: item.name,
          location: item.location.formatted_address,
        }));

        setNearbyPlaces(places);
      } else {
        console.error('Error fetching nearby places:', response.data);
      }
    } catch (error) {
      console.error('Error fetching nearby places:', error);
    }
  };

  const renderItem: React.FC<{
    item: {id: number; title: string; value: string};
  }> = ({item}) => (
    <View style={[styles.rowView, {width: '70%'}]}>
      <Text>{item.title}</Text>
      <Text style={styles.tableValueText}>{item.value}</Text>
    </View>
  );

  const renderCardItem: React.FC<{
    item: {id: number; title: string; imageSource: ImageSourcePropType};
  }> = ({item}) => {
    const words = item.title.split(' ');

    return (
      <View style={styles.cardView}>
        <Image style={{height: 75, width: 75}} source={item.imageSource} />
        {words.map((word, index) => (
          <Text key={index} style={styles.cardText}>
            {word}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Header
          title="Majestic Manor"
          showInfoIcon={true}
          rightIconSource={require('../assets/images/share.png')}
        />
        <View style={styles.carouselView}>
          <Image
            style={{height: '100%', width: '100%'}}
            source={require('../assets/images/carouselImage.png')}
          />
        </View>

        <View style={styles.detailView}>
          <View style={styles.rowView}>
            <Text style={styles.text}>Majestic Manor</Text>
            <Text style={styles.text}>₹4.2 Cr</Text>
          </View>

          <Text style={styles.greyText}>
            Banshankari, 3rd stage, Bengaluru, India
          </Text>
          <Text style={[styles.greyText, {color: Colors.grey}]}>
            2BHK | Independent house | 1400 sq. ft. | Semi- furnished
          </Text>
          <View style={styles.rowView}>
            <Text
              style={[styles.greyText, {color: Colors.green, marginBottom: 0}]}>
              Available from: 03/04/2024
            </Text>
            <View style={styles.postedContainer}>
              <Text>Posted:Today</Text>
            </View>
          </View>
          <Text style={[styles.text, {marginVertical: Spacing.medium}]}>
            OVERVIEW
          </Text>
          <Text style={styles.greyText}>
            Majestic Manor is right in the heart of Bangalore. You'll find a
            cozy 3 BHK apartment with bright, airy rooms. There's a school
            nearby, making it convenient for families. Experience city living at
            its finest in Majestic Manor.
          </Text>
          <FlatList
            data={propertyData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
          <Text>View More details</Text>
          <Text>AMENITIES</Text>
          <FlatList
            data={cardsData}
            renderItem={renderCardItem}
            numColumns={4}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={{
              width: '100%',
              paddingHorizontal: 10,
              alignItems: 'center',
            }}
          />
          <Text style={[styles.text, {marginVertical: Spacing.medium}]}>
            LIVEABILITY
          </Text>
          <View style={styles.livebilityCard}>
            <View style={styles.cardRowView}>
              <View style={{flex: 1}}>
                <Text style={[styles.text, {marginVertical: Spacing.medium}]}>
                  Liveability Score
                </Text>
                <Text style={styles.blueText}>8/10</Text>
              </View>

              <CircularProgress size={80} progress={80} />
            </View>
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              onTabPress={handleTabPress}
              tabStyle={{
                justifyContent: 'space-around',
                paddingTop: Spacing.medium,
                marginBottom: Spacing.large,
              }}
              activeTabStyle={{
                paddingVertical: Spacing.xsmall,
              }}
            />
            <View style={[styles.scoreCard]}>
              <Text>Neighbourhood Score</Text>
              <Text
                style={[
                  styles.blueText,
                  {fontSize: Fontsize.description, marginTop: 0},
                ]}>
                7/10
              </Text>
            </View>
          </View>
          <FlatList
            data={labels}
            renderItem={renderLabel}
            keyExtractor={item => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{marginTop: 20}}
          />

          <ImageBackground
            style={{height: 500, marginTop: Spacing.mid}}
            source={require('../assets/images/mapView.png')}>
            <View style={{position: 'absolute', right: 20, top: 20}}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderTopRightRadius: 8,
                  borderTopLeftRadius: 8,
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    color: Colors.grey,
                  }}>
                  +
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: Spacing.small,
                  borderBottomRightRadius: 8,
                  borderBottomLeftRadius: 8,
                }}>
                <Text
                  style={{
                    fontSize: 35,
                    color: Colors.grey,
                  }}>
                  -
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.filteredPlacesContainer}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={nearbyPlaces}
                renderItem={({item, index}) => (
                  <View key={index} style={styles.placeCard}>
                    <Image
                      style={{width: '100%', height: 120, borderRadius: 10}}
                      source={require('../assets/images/stockImage.png')}
                    />
                    <Text style={styles.placeName}>{item.name}</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: Colors.borderGray,
                        paddingBottom: Spacing.mid,
                        marginBottom: Spacing.mid,
                      }}>
                      <Image
                        style={{width: 12, height: 12, marginRight: 4}}
                        source={require('../assets/images/star.png')}
                      />
                      <Text style={styles.greysmText}>
                        4.4 (26,940) | Bar | 1.1km
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Image
                        style={{width: 15, height: 17.5, marginRight: 8}}
                        source={require('../assets/images/map.png')}
                      />
                      <Text numberOfLines={2} style={styles.greysmText}>
                        {item.location}
                      </Text>
                    </View>
                    <View
                      style={{flexDirection: 'row', marginTop: Spacing.medium}}>
                      <Image
                        style={{width: 15, height: 15, marginRight: 8}}
                        source={require('../assets/images/phone.png')}
                      />
                      <Text numberOfLines={2} style={styles.greysmText}>
                        09342158585
                      </Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{}}
              />
            </View>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: Colors.offWhite},
  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.small,
  },
  text: {
    fontSize: Fontsize.subHeading,
    fontFamily: Typography.bold,
    color: Colors.grey,
  },
  greyText: {
    fontSize: Fontsize.description,
    fontFamily: Typography.bold,
    color: Colors.lightGrey,
    marginBottom: Spacing.medium,
  },
  greysmText: {
    fontSize: Fontsize.description,
    fontFamily: Typography.bold,
    color: Colors.lightGrey,
  },
  carouselView: {
    height: 260,
  },
  detailView: {
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.mid,
  },
  postedContainer: {
    backgroundColor: Colors.brown,
    padding: Spacing.xsmall,
    borderRadius: 5,
  },
  tableValueText: {
    textAlign: 'left',
    fontSize: Fontsize.description,
    fontFamily: Typography.bold,
    color: Colors.grey,
  },
  cardView: {
    alignItems: 'center',
    marginBottom: Spacing.medium,
    paddingHorizontal: Spacing.small,
  },
  cardText: {
    textAlign: 'center',
    fontSize: Fontsize.description,
    fontFamily: Typography.bold,
    color: Colors.grey,
    flexWrap: 'wrap',
    flexShrink: 1,
  },
  livebilityCard: {
    backgroundColor: Colors.white,
    borderColor: Colors.borderGray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.mid,
  },
  cardRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderGray,
    paddingBottom: Spacing.medium,
  },
  blueText: {
    fontSize: Fontsize.largeHeading,
    fontFamily: Typography.bold,
    color: Colors.tealBLue,
    fontWeight: '700',
    marginTop: Spacing.small,
  },
  scoreCard: {
    borderColor: Colors.borderGray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.medium,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filteredPlacesContainer: {
    marginTop: Spacing.medium,
    position: 'absolute',
    bottom: 5,
  },
  placeCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderGray,
    padding: Spacing.small,
    marginHorizontal: Spacing.xsmall,

    borderRadius: 10,
    width: 300,
  },
  placeName: {
    fontSize: Fontsize.heading,
    fontWeight: '500',
    color: Colors.darkBlue,
    marginVertical: Spacing.medium,
  },
  placeType: {
    fontSize: Fontsize.description,
    fontFamily: Typography.Regular,
    color: Colors.grey,
    marginTop: Spacing.xsmall,
  },
  labelButton: {
    marginHorizontal: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedLabel: {
    backgroundColor: '#DDE4EC',
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default HomeScreen;
