"use client";

import {useEffect} from 'react';

export function BootstrapClient() {
  useEffect(() => {
    // Dynamically import the Bootstrap bundle only on the client side
    require('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  
  return null;
}
