import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {getListApiIntegrationMethod} from '../actionCreator/getListActionCreator';
import {connect} from 'react-redux';
import * as actionTypes from '../action';

const Url = 'https://jsonplaceholder.typicode.com/users';

const ListGrid = (props) => {
  useEffect(() => {
    props.getListApiIntegrationMethod();
  }, []);

  const renderIndicator = () => (
    <View style={styles.loaderView}>
      <ActivityIndicator size="large" color="rgb(49, 127, 217)" />
    </View>
  );

  const removeDetail = (index) => {
    props.removeDataFromList(index);
  };

  const renderItem = ({item, index}) => (
    <View
      style={[
        styles.defaultContainer,
        index % 2 === 0
          ? styles.leftAlignDetailContainer
          : styles.rightAlignDetailContainer,
      ]}>
      <View style={styles.subDetailContainer}>
        <View style={styles.detailView}>
          <Text style={styles.nameStyle}>Name : {item.name}</Text>
          <Text>Email: {item.email}</Text>
          <Text numberOfLines={1} ellipsizeMode={'tail'}>
            {item.address.suite}, {item.address.street}, {item.address.city}-
            {item.address.zipcode}
          </Text>
          <Text>Phone: {item.phone}</Text>
        </View>
        <View style={styles.imageView}>
          <TouchableOpacity
            onPress={() => removeDetail(index)}
            style={styles.tinyLogo}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri:
                  'https://img.icons8.com/color/48/000000/delete-forever.png',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.defaultText}>anastasia.net</Text>
    </View>
  );

  const renderAllItems = () => {
    props.renderAllItems();
  };

  const renderFooter = () => {
    return (
      props.footerStatus === 'show' && (
        <TouchableOpacity onPress={renderAllItems} style={styles.footer}>
          <Text style={styles.footerText}>Continue for all the data ...</Text>
        </TouchableOpacity>
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.listStyle}
        data={props.currentResponse}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        keyExtractor={(item) => item.id.toString()}
      />
      {props.loaderController && renderIndicator()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  defaultContainer: {
    borderColor: 'rgb(131,131,131)',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: 'rgb(238,238,238)',
    marginBottom: 15,
  },
  leftAlignDetailContainer: {
    marginRight: 30,
  },
  rightAlignDetailContainer: {
    marginLeft: 30,
  },
  listStyle: {
    marginTop: 20,
  },
  defaultText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  subDetailContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  detailView: {
    flex: 0.9,
    paddingLeft: 10,
  },
  imageView: {
    flex: 0.1,
  },
  tinyLogo: {
    height: 25,
    width: 25,
    alignSelf: 'center',
  },
  nameStyle: {
    fontWeight: 'bold',
  },
  footer: {
    height: 60,
  },
  footerText: {
    marginLeft: 30,
    marginTop: 5,
    fontWeight: 'bold',
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    getListApiIntegrationMethod: () =>
      dispatch(getListApiIntegrationMethod(Url)),
    removeDataFromList: (index) =>
      dispatch({type: actionTypes.REMOVE_DATA_ITEM, value: index}),
    renderAllItems: () => dispatch({type: actionTypes.APPEND_ALL_ITEMS}),
  };
};

const mapStateToProps = (state) => {
  return {
    loaderController: state.isLoading,
    currentResponse: state.currentResponse,
    footerStatus: state.footerStatus,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListGrid);
