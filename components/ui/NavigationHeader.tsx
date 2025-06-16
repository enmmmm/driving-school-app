import {View, StyleSheet, Text} from "react-native";
import ImageIcon from "@/components/ui/ImageIcon";
import React from "react";
import {useNavigation} from "expo-router";

interface Props {
  title?: string | React.ReactNode;
  headerLeft?: React.ReactNode;
  headerRight?: React.ReactNode;
}

export default function NavigationHeader(props: Props) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {props.headerLeft ?? (
        <ImageIcon
          style={styles.backIcon}
          size={24}
          source={require('@/assets/images/header-back-icon.png')}
          onPress={() => navigation.goBack()}
        />
      )}
      <View style={styles.headerCenter}>
        {typeof props.title === 'string' ? <Text style={styles.title}>{props.title}</Text> : props.title}
      </View>
      {props.headerRight}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  backIcon: {
    paddingRight: 8,
  },
  headerCenter: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    lineHeight: 18,
    color: 'rgba(255,255,255,0.95)',
    fontWeight: '500',
  }
})
