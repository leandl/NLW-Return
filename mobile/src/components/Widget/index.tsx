import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react';

import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { FeedbackType } from '../../utils/feedbackTypes';
import { theme } from '../../theme';

import { styles } from './styles';

import { Options } from '../Options';
import { Form } from '../Form';
import { Success } from '../Success';

export const Widget = gestureHandlerRootHOC(function () {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState<boolean>(false);

  const bottomSheet = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheet.current?.expand();
  }

  function handleRestartFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  function handleFeedbackSent() {
    setFeedbackSent(true);
  }

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpen}
      >
        <ChatTeardropDots 
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheet}
        snapPoints={[1, 280]}
        backgroundStyle={styles.modal}
        handleIndicatorStyle={styles.indicator}
      >
        {feedbackSent ?  (
          <Success 
            onSendAnotherFeedback={handleRestartFeedback}
          />
        ) : (
          <>
            {feedbackType ? (
              <Form 
                feedbackType={feedbackType}
                onFeedbackCanceled={handleRestartFeedback}
                onFeedbackSent={handleFeedbackSent}
              />
            ) : (
              <Options 
                onFeedbackTypeChanged={setFeedbackType}
              />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
})