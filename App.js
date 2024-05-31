import { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View, LayoutAnimation, UIManager, Platform } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Button from "./components/utils/Button";
import Row from "./components/utils/Row";
import CollapseButton from "./components/utils/CollapseButton";
import calculator, { initialState } from "./components/utils/Calculator";
import { StatusBar } from 'expo-status-bar';
import * as ScreenOrientation from 'expo-screen-orientation';

if (Platform.OS === 'android' || Platform.OS === 'ios' || Platform.OS === 'web') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const [state, setState] = useState(initialState);
  const [collapsed, setCollapsed] = useState(false);
  const [orientation, setOrientation] = useState(ScreenOrientation.OrientationLock.DEFAULT);

  useEffect(() => {
    const subscription = ScreenOrientation.addOrientationChangeListener((evt) => {
      setOrientation(evt.orientationInfo.orientation);
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const isLandscape = orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT 
                   || orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;


  const handleTap = (type, value) => {
    if (type === "delete" && value === "long") {
      setState(initialState);
    } else {
      setState((state) => calculator(type, value, state));
    }
  };

  const handleCollapse = (isCollapsed) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed(isCollapsed);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <ScrollView horizontal contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 12, color: 'gray', fontWeight: '200' }}>
            Bunsen Calculator
          </Text>
        </ScrollView>
        <ScrollView horizontal contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
          <Text style={styles.value}>
            {parseFloat(state.currentValue).toLocaleString()}
          </Text>
        </ScrollView>

         {!isLandscape && (
          <View style={styles.collapseButtonContainer}>
            <CollapseButton onPress={handleCollapse} />
          </View>
         )}
        
        {collapsed && !isLandscape && (
          <>
            <Row>
              <Button text="RAD" theme="transparent" 
              onPress={() => handleTap("rad")} isCollapsed={collapsed} />
              <Button text={<MaterialCommunityIcons name='square-root' size={30} />} 
              theme="transparent" onPress={() => handleTap("square-root")} isCollapsed=
              {collapsed} />
              <Button text="sin" theme="transparent" onPress={() => handleTap("sin")} 
              isCollapsed={collapsed} />
              <Button text="cos" theme="transparent" onPress={() => handleTap("cos")} 
              isCollapsed={collapsed} />
              <Button text="tan" theme="transparent" onPress={() => handleTap("tan")} 
              isCollapsed={collapsed} />
            </Row>
            <Row>
              <Button text="INV" theme="transparent" onPress={() => handleTap("inv")} 
              isCollapsed={collapsed} />
              <Button text={<MaterialCommunityIcons name='exponent' size={30} />} 
              theme="transparent" onPress={() => handleTap("exponent")} isCollapsed={collapsed} />
              <Button text="e" theme="transparent" onPress={() => handleTap("e")} 
              isCollapsed={collapsed} />
              <Button text="In" theme="transparent" onPress={() => handleTap("in")} 
              isCollapsed={collapsed} />
              <Button text="log" theme="transparent" onPress={() => handleTap("log")} 
              isCollapsed={collapsed} />
            </Row>
          </>
        )}

        <Row>
        {isLandscape && (<>
          <Button text="RAD" theme="transparent" 
              onPress={() => handleTap("rad")} isCollapsed={collapsed} />
          <Button text="INV" theme="transparent" onPress={() => handleTap("inv")} 
              isCollapsed={collapsed} />
        </>)}
          <Button text="AC" theme="secondary" onPress={() => handleTap("clear")} 
          isCollapsed={collapsed} />
          <Button text="+/-" theme="secondary" onPress={() => handleTap("posneg")} 
          isCollapsed={collapsed} />
          <Button text="%" theme="secondary" onPress={() => handleTap("percentage")} 
          isCollapsed={collapsed} />
          <Button text="/" theme="accent" onPress={() => handleTap("operator", "/")} 
          isCollapsed={collapsed} />
        </Row>

        <Row>
        {isLandscape && (<>
          <Button text={<MaterialCommunityIcons name='square-root' size={30} />} 
              theme="transparent" onPress={() => handleTap("square-root")} isCollapsed=
              {collapsed} />
          <Button text={<MaterialCommunityIcons name='exponent' size={30} />} 
              theme="transparent" onPress={() => handleTap("exponent")} isCollapsed={collapsed} />
        </>)}
          <Button text="7" onPress={() => handleTap("number", 7)} isCollapsed={collapsed} />
          <Button text="8" onPress={() => handleTap("number", 8)} isCollapsed={collapsed} />
          <Button text="9" onPress={() => handleTap("number", 9)} isCollapsed={collapsed} />
          <Button text="X" theme="accent" onPress={() => handleTap("operator", "*")} 
          isCollapsed={collapsed} />
        </Row>

        <Row>
        {isLandscape && (<>
          <Button text="sin" theme="transparent" onPress={() => handleTap("sin")} 
              isCollapsed={collapsed} />
          <Button text="e" theme="transparent" onPress={() => handleTap("e")} 
                isCollapsed={collapsed} />
        </>)}
          <Button text="4" onPress={() => handleTap("number", 4)} isCollapsed={collapsed} />
          <Button text="5" onPress={() => handleTap("number", 5)} isCollapsed={collapsed} />
          <Button text="6" onPress={() => handleTap("number", 6)} isCollapsed={collapsed} />
          <Button text={<Entypo name="minus" size={22} />} theme="accent" 
          onPress={() => handleTap("operator", "-")} isCollapsed={collapsed} />
        </Row>

        <Row>
        {isLandscape && (<>
        <Button text="cos" theme="transparent" onPress={() => handleTap("cos")} 
              isCollapsed={collapsed} />
         <Button text="In" theme="transparent" onPress={() => handleTap("in")} 
              isCollapsed={collapsed} />
        </>)}
          <Button text="1" onPress={() => handleTap("number", 1)} isCollapsed={collapsed} />
          <Button text="2" onPress={() => handleTap("number", 2)} isCollapsed={collapsed} />
          <Button text="3" onPress={() => handleTap("number", 3)} isCollapsed={collapsed} />
          <Button text="+" theme="accent" onPress={() => handleTap("operator", "+")} 
          isCollapsed={collapsed} />
        </Row>

        <Row>
        {isLandscape && (<>
        <Button text="tan" theme="transparent" onPress={() => handleTap("tan")} 
              isCollapsed={collapsed} />
        <Button text="log" theme="transparent" onPress={() => handleTap("log")} 
              isCollapsed={collapsed} />
        </>)}
          <Button text="0" onPress={() => handleTap("number", 0)} isCollapsed={collapsed} />
          <Button text={<Entypo name="dot-single" size={22} />} 
          onPress={() => handleTap("number", ".")} isCollapsed={collapsed} />
          <Button text={<Feather name="delete" size={22} />} theme="primary" 
          onPress={() => handleTap("delete")} onLongPress={() => handleTap("delete", "long")} 
          isCollapsed={collapsed} />
          <Button text="=" theme="primary" onPress={() => handleTap("equal")} 
          isCollapsed={collapsed} />
        </Row>
      </SafeAreaView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "flex-end",
  },
  value: {
    color: "#fff",
    fontSize: 42,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
  collapseButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
});
