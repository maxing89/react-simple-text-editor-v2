import React, { useState } from 'react';
import { message } from 'antd';
import Header from './Header';
import FileZone from './FileZone';
import {
    convertTextIntoArray,
    changeWordFormat,
    changeSelectedWordFormat,
    replaceWordWithSynonym,
    changeSelectedWordValue,
} from '../helpers';
import dataMuseAPI from '../api/api';
import { AppWrapper } from './styles'
 
const TextEditorContainer = (props) => {
  const defaultFormat = {
    bold: false,
    italic: false,
    underline: false,
    color: '#000000',
  };

  const [inputText, setInputText] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);
  const [synonyms, setSynonyms] = useState([]);
  const [loadingSynonyms, setLoadingSynonyms] = useState(false);

  const getSynonyms = (selectedWord) => {
    setLoadingSynonyms(true);

    dataMuseAPI.fetchWordSynonyms(selectedWord.word.value)
      .then((synonyms) => {
        setSynonyms(synonyms);
        setLoadingSynonyms(false);
      })
      .catch(() => {
        setSynonyms([]);
        setLoadingSynonyms(false);
        message.error('Error while fetching synonyms')
      });
  }

  const handleOnChangeFormat = (checked, format) => {
    if (selectedWord) {
      const modifiedText = changeWordFormat(inputText, selectedWord, checked, format);
      const modifiedSelectedWord = changeSelectedWordFormat(selectedWord, checked, format);
      setInputText(modifiedText);
      setSelectedWord(modifiedSelectedWord);
    } else {
      message.error('You must select a word to change its format!')
    }
  }

  const handleSubmit = (text) => {
    const arrayOfWords = convertTextIntoArray(text);
    setInputText(arrayOfWords);
  }

  const handleReset = () => {
    setInputText(null);
    setSelectedWord(null);
    setSynonyms([]);
  }

  const handleOnSelection = (selectedWord) => {
    setSelectedWord(selectedWord);
    getSynonyms(selectedWord);
  }

  const handleUnSelect = () => {
    setSelectedWord(null);
  }

  const handleSelectSynonym = (synonym) => {
    const modifiedText = replaceWordWithSynonym(inputText, selectedWord, synonym);
    const modifiedSelectedWord = changeSelectedWordValue(selectedWord, synonym);
    setInputText(modifiedText);
    setSelectedWord(modifiedSelectedWord);
  }

  return (
    <AppWrapper>
      <Header 
        onChangeFormat={handleOnChangeFormat}
        format={selectedWord ? selectedWord.word.format : defaultFormat}
        loadingSynonyms={loadingSynonyms}
        synonyms={synonyms}
        selectedWord={selectedWord}
        onSelectSynonym={handleSelectSynonym}
      />
      <FileZone
        onSubmit={handleSubmit}
        onReset={handleReset}
        onSelection={handleOnSelection}
        onClick={handleUnSelect}
        words={inputText} />
    </AppWrapper>
  )
}

export default TextEditorContainer