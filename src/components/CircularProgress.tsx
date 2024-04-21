import React from 'react';
import {View} from 'react-native';
import Svg, {Circle, G, Text} from 'react-native-svg';
import {Colors} from '../theme';

interface CircularProgressProps {
  size: number;
  progress: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size,
  progress,
}) => {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progressStrokeDashoffset =
    circumference - (progress / 100) * circumference;

  return (
    <View>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${size / 2},${size / 2}`}>
          <Circle
            stroke="#d3d3d3"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <Circle
            stroke={Colors.tealBLue}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            strokeLinecap="round"
            strokeDashoffset={progressStrokeDashoffset}
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </G>
        <Text
          fill={Colors.darkBlue}
          fontSize="20"
          fontWeight="bold"
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em">
          {`${progress}%`}
        </Text>
      </Svg>
    </View>
  );
};

export default CircularProgress;
