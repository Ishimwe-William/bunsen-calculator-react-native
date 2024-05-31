import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';


const CollapseButton = ({ onPress }) => {
  const [collapsed, setCollapsed] = React.useState(true);

  const handlePress = () => {
    setCollapsed(!collapsed);
    onPress(collapsed);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      {collapsed ?(
        <AntDesign name="downcircleo" size={24} color="gray" />
        ):(
       <AntDesign name="upcircleo" size={24} color="gray" />
      )}
    </TouchableOpacity>
  );
};

export default CollapseButton;

