import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Trash, Camera } from 'phosphor-react';

import { theme } from '../../theme';
import { styles } from './styles';

interface ScreenshotButtonProps {
  screenshot: string | null;
  onTakeScreenshot(): Promise<void>;
  onRemoveScreenshot(): void 
}

export function ScreenshotButton({ screenshot, onTakeScreenshot, onRemoveScreenshot }: ScreenshotButtonProps) {
  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={screenshot ? onRemoveScreenshot : onTakeScreenshot}
    >
      {screenshot ? (
        <View>
          <Image 
            source={{ uri: screenshot }}
            style={styles.image}
          />
          <Trash 
            size={22} 
            color={theme.colors.text_secondary} 
            weight="fill"
            style={styles.removeIcon}
          /> 
        </View>
        
      ) : (
        <Camera 
          size={24} 
          color={theme.colors.text_primary} 
          weight="fill"
        /> 
      )}
    </TouchableOpacity>
  );
}