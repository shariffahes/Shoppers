import React, { useEffect } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import ItemView from "../../Components/ItemView";
import { Entypo } from "@expo/vector-icons";
import Colors from "../../Constants/Colors";
import CustomText from "../../Components/CustomText";
import { deleteProduct } from "../../Store/actions/products";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../Components/CustomHeaderButton";
const MyProductsScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: (options) => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            iconName="squared-plus"
            title="Add"
            color={options.tintColor}
            iconSize={25}
            onPress={() => props.navigation.navigate("The product")}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  const editProductHandler = (id) => {
    props.navigation.navigate("The product", { prodId: id });
  };

  const deleteHandler = (id) => {
    return Alert.alert(
      "Deleting this item will be permanently",
      "Are you sure you want to delete it ?",
      [
        { text: "No", style: "default" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => {
            dispatch(deleteProduct(id));
          },
        },
      ]
    );
  };

  const renderList = (items) => {
    return (
      <ItemView
        storeItem={items.item}
        onPressHandler={() => editProductHandler(items.item.id)}
      >
        <View
          style={{
            width: "30%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomText
            style={{
              fontSize: 16,
              color: "white",
              fontFamily: "open-sans-bold",
            }}
          >
            Edit
          </CustomText>
          <Entypo
            onPress={() => editProductHandler(items.item.id)}
            name="pencil"
            size={25}
            color={Colors.accent}
            style={{ flex: 0.5, textAlign: "center" }}
          />
        </View>
        <View
          style={{
            width: "30%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomText
            style={{
              fontSize: 16,
              color: "white",
              fontFamily: "open-sans-bold",
            }}
          >
            Delete
          </CustomText>
          <Entypo
            onPress={() => deleteHandler(items.item.id)}
            name="trash"
            size={25}
            color="red"
            style={{ flex: 0.5, textAlign: "center" }}
          />
        </View>
      </ItemView>
    );
  };

  return <FlatList data={userProducts} renderItem={renderList} />;
};

const styles = StyleSheet.create({});

export default MyProductsScreen;
