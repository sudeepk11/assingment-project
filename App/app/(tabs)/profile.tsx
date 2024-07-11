import { View, Text } from 'react-native'
import React from 'react'
import useAuthStore from '../../hooks/useZustandStore'
import Button from '../../components/ui/CustomButton'

const ProfileScreen = () => {
  const {user,logoutUser} = useAuthStore()
  return (
    <View className=' h-screen items-center justify-center'>
      <View >
      <Text className='text-center text-3xl mb-3'>Hello {user?.username.toUpperCase()} 👋 </Text>
      <Button text='LOGOUT' outlined onClickHandler={logoutUser}/>
      </View>
    </View>
  )
}

export default ProfileScreen