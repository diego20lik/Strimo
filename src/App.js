import React, { useState, useEffect } from "react";
import firebase from "./utils/firebase";
import { onMessageListener } from "./utils/firebase";
import Index from "./strimo-reorg/components/router/index";
function App() {
  return (
    <>
      <Index />
    </>
  );
}

export default App;
