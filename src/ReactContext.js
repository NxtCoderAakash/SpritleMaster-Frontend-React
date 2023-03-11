import React from 'react'

const ReactContext = React.createContext({
  username: '',
  setNameParent: () => {},
  isLoggedIn: false,
  removeNameParent: () => {},
})

export default ReactContext
