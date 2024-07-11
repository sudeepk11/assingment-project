import { View, Text, Image } from "react-native";
import React from "react";
import { Redirect, Tabs, useRouter } from "expo-router";
import { icons } from "../../constants";
import useAuthStore from "../../hooks/useZustandStore";
const TabsLayout = () => {
  const store = useAuthStore((state)=>{return state});
  const {token} = store

  if (true) {
     return <Redirect href={"/sign_in"}/>;
  } 
  const TabIconComponent = ({ name, icon, focused, color }) => {
    return (
      <View className=" items-center  justify-center  ">
        <Image
          source={icon}
          tintColor={color}
          resizeMode={"contain"}
          className="w-6 h-6"
        />
        <Text
          className={` ${focused ? " font-psemibold " : " font-pregular"}  `}
          style={{ color }}
        >
          {name}
        </Text>
      </View>
    );
  };
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#576AD4",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopColor: "#232533",
            borderTopWidth: 1,
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "home",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIconComponent
                name={"Home"}
                focused={focused}
                icon={icons.home}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused, color }) => (
              <TabIconComponent
                name={"profile"}
                focused={focused}
                icon={icons.profile}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
