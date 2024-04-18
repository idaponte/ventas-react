import { View } from 'react-native'

export const Column = ({ children, style }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', ...style }}>
      {children}
    </View>
  )
}

export const ColumnCenter = ({ children }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {children}
    </View>
  )
}

export const ColumnBetween = ({ children }) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {children}
    </View>
  )
} 
