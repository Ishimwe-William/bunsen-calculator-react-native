import {useEffect, useState} from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';

const screen = Dimensions.get("window");
const buttonHeight = screen.height/4.5;

export default ({ onPress, text, size, theme, onLongPress, isCollapsed }) => {
  const buttonStyles = [styles.button];
  const textStyles = [styles.text];
  const [orientation, setOrientation] = useState(ScreenOrientation.OrientationLock.DEFAULT);
  const [btnHeight, setBtnHeight] = useState(buttonHeight)

  useEffect(() => {
  const subscription = ScreenOrientation.addOrientationChangeListener((evt) => {
    setOrientation(evt.orientationInfo.orientation);
    const window = Dimensions.get("window");
    const newButtonHeight = window.height / 4.5;
    setBtnHeight(newButtonHeight);
  });

  return () => {
    ScreenOrientation.removeOrientationChangeListener(subscription);
  };
}, []);

  const isLandscape = orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT 
                   || orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;


  if (size === "double") {
    buttonStyles.push(styles.buttonDouble);
  }
  if (theme === "secondary") {
    buttonStyles.push(styles.buttonSecondary);
    textStyles.push(styles.textSecondary);
  } else if (theme === "accent") {
    buttonStyles.push(styles.buttonAccent);
  } else if(theme === 'transparent'){
    buttonStyles.push(styles.transparent);
    textStyles.push(styles.textTransparent);

  }
  
  let landscapeHeight = btnHeight - (btnHeight * 50 / 100);
  let portraitHeight =  btnHeight - (btnHeight * 50 / 100);
  let portraitCallapsedHeight =  btnHeight - (btnHeight * 65 / 100);

  
  return (
    <TouchableOpacity
     onPress={onPress}
      onLongPress={onLongPress}
       style={[buttonStyles,
      {
        height: isLandscape ? landscapeHeight : (isCollapsed ? portraitCallapsedHeight : portraitHeight),
      }]}>
      <Text style={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#333333",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    margin: 5,
  },
  text: {
    color: "#fff",
    fontSize: 24,
  },
  textSecondary: {
    color: "#060606",
  },
  buttonDouble: {
    flexGrow: 2,
    flex: 0,
    alignItems: "flex-start",
    paddingLeft: 40,
  },
  buttonSecondary: {
    backgroundColor: "#a6a6a6",
  },
  buttonAccent: {
    backgroundColor: "#ffc107",
  },
  transparent:{
      backgroundColor: "transparent",
  },
  textTransparent:{
    color: 'white',
    fontWeight: '300'
  }
});