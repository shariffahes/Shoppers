import { HeaderButton } from "react-navigation-header-buttons";
import { Entypo } from "@expo/vector-icons";
import React from "react";
const CustomHeaderButton = (props) => {
  return <HeaderButton iconSize={20} {...props} IconComponent={Entypo} />;
};

export default CustomHeaderButton;
