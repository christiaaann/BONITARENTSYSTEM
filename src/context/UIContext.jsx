import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'

const UIContext = createContext();

export const UIProvider = () => {

  return (
    <div>UIContext</div>
  )
}

export const useUI = () => useContext(UIContext);
