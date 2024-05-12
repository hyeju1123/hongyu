import React, {useCallback, useEffect, useState} from 'react';
import {ColorValue, Text, TouchableOpacity, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import SvgIcon from './SvgIcon';
import {useTheme} from '@react-navigation/native';
import styles from '../styles/module/CanvasStyle';

type PathType = {
  path: string[];
  color: string;
  stroke: number;
};
export type SigningPathType = PathType[];

export const STROKE_SIZE = 2.5;

type CanvasProp = {
  index: number;
  writings: SigningPathType[];
  writingRef: React.MutableRefObject<SigningPathType>;
};

const Canvas = ({index, writings, writingRef}: CanvasProp): JSX.Element => {
  const {
    colors: {
      background,
      textPrimary,
      iconPrimary,
      ongoingState,
      contentBackground,
    },
  } = useTheme();
  const stroke = STROKE_SIZE;
  const color = textPrimary;
  const [paths, setPaths] = useState<SigningPathType>([]);

  const setNewPath = useCallback(
    (x: number, y: number) => {
      setPaths(prev => {
        const result = [...prev, {path: [`M${x} ${y}`], color, stroke}];
        return result;
      });
    },
    [color, stroke],
  );

  const updatePath = useCallback(
    (x: number, y: number) => {
      setPaths(prev => {
        const currentPath = prev[prev.length - 1];
        currentPath && currentPath.path.push(`L${x} ${y}`);

        const updatedValue = currentPath
          ? [...prev.slice(0, -1), currentPath]
          : prev;
        writingRef.current = updatedValue;
        return updatedValue;
      });
    },
    [writingRef],
  );

  const deleteOnePath = useCallback(() => {
    setPaths(prev => prev.slice(0, -1));
  }, []);

  const dottedLineDots = (horizon: Boolean) =>
    Array.from({length: 100}, (_, idx) => (
      <View
        key={idx}
        style={[
          {
            borderColor: ongoingState,
          },
          horizon
            ? styles.horizontalDottedLineDot
            : styles.verticalDottedLineDot,
        ]}
      />
    ));

  useEffect(() => {
    setPaths(writings[index]);
  }, [writings, index]);

  return (
    <View
      style={[styles.canvasBackground, {backgroundColor: contentBackground}]}>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={[
            styles.shadow,
            styles.buttonWrapper,
            styles.resetButton,
            {backgroundColor: background},
          ]}
          onPress={() => setPaths([])}>
          <SvgIcon
            name="Sparkles"
            fill={iconPrimary}
            size={styles.writingReset.width}
          />
          <Text style={[styles.resetButtonText, {color: textPrimary}]}>
            전체 지우기
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.shadow,
            styles.buttonWrapper,
            styles.resetButton,
            {backgroundColor: background},
          ]}
          onPress={deleteOnePath}>
          <SvgIcon
            name="Eraser"
            fill={iconPrimary}
            size={styles.writingReset.width}
          />
          <Text style={[styles.resetButtonText, {color: textPrimary}]}>
            한 획 지우기
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[styles.canvas, styles.shadow, {backgroundColor: background}]}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderStart={e => {
          if (e.nativeEvent.touches.length === 1) {
            const {locationX, locationY} = e.nativeEvent;
            setNewPath(locationX, locationY);
          }
        }}
        onResponderMove={e => {
          if (e.nativeEvent.touches.length === 1) {
            const {locationX, locationY} = e.nativeEvent;
            updatePath(locationX, locationY);
          }
        }}>
        <View style={styles.backHanziWrapper}>
          <View style={styles.horizonContainer}>{dottedLineDots(true)}</View>
          <View style={styles.verticalContainer}>{dottedLineDots(false)}</View>
        </View>
        <Svg height={'100%'} width={'100%'}>
          {paths?.map(({path, color: c, stroke: s}, i) => {
            return (
              <Path
                key={i}
                d={`${path.join(' ')}`}
                fill="none"
                strokeWidth={`${s}px`}
                stroke={c as ColorValue}
                strokeLinecap={'round'}
              />
            );
          })}
        </Svg>
      </View>
    </View>
  );
};

export default Canvas;
