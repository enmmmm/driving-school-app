import {Image, ImageProps, TouchableOpacity, TouchableOpacityProps} from "react-native";
import React from "react";

interface Props extends Pick<ImageProps, 'source'> {
  size: number;
}

export default function ImageIcon(props: Props & Pick<ImageProps, 'source'> & Pick<TouchableOpacityProps, 'onPress' | 'style'>) {
  return (
    <TouchableOpacity style={props.style} onPress={props.onPress} disabled={!props.onPress}>
      <Image style={{height: props.size, width: props.size}} source={props.source}/>
    </TouchableOpacity>
  )
}
