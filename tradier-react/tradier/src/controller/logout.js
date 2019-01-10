import React, { Component } from 'react';

export const logout = (code) =>{
  localStorage.removeItem('code');
  localStorage.removeItem('Authorization');
  
     return true;
}



