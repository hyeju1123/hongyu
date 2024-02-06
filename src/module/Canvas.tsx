import React, {useCallback, useEffect, useState} from 'react';
import {ColorValue, Text, TouchableOpacity, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {lightTheme} from '../styles/colors';
import styles from '../styles/module/CanvasStyle';
import SvgIcon from './SvgIcon';

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
  const stroke = STROKE_SIZE;
  const color = lightTheme.black;
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

  useEffect(() => {
    setPaths(writings[index]);
  }, [writings, index]);

  return (
    <View style={styles.canvasBackground}>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={[styles.buttonWrapper, styles.resetButton, styles.shadow]}
          onPress={() => setPaths([])}>
          <SvgIcon name="Sparkles" fill={lightTheme.red} size={20} />
          <Text style={styles.resetButtonText}>전체 지우기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonWrapper, styles.resetButton, styles.shadow]}
          onPress={deleteOnePath}>
          <SvgIcon name="Eraser" fill={lightTheme.red} size={20} />
          <Text style={styles.resetButtonText}>한 획 지우기</Text>
        </TouchableOpacity>
      </View>
      <View
        style={[styles.canvas, styles.shadow]}
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
          <View style={[styles.auxiliaryLine, styles.horizonLine]} />
          <View style={[styles.auxiliaryLine, styles.verticalLine]} />
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
