import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../Constants/Colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import ImagePath from '../../Constants/ImagePath'
import { Button } from '../../Components'
import { useNavigation } from '@react-navigation/native'
import NavigationString from '../../Constants/NavigationString'

const SuccessPage = () => {
    const navigation = useNavigation()
  return (
   <SafeAreaView style={styles.mainContainer}>
    <View style={styles.card}>
      <Image source={ImagePath.successIcon} style={styles.successIconStyle}/>
      <Text style={styles.successText}>Successfull</Text>
      <Text style={styles.amountPaidText}>Membership payment successfull</Text>
      <Text style={styles.amountPaidText}>Amount Paid : $ 49</Text>
    </View>
    <Button w={30} h={5} br={6} title={'HOME'} onPress={()=>navigation.navigate(NavigationString.VIP_TIPS)} />
      
   </SafeAreaView>
  )
}

export default SuccessPage

const styles = StyleSheet.create({
mainContainer:{
    flex:1,backgroundColor:Colors.mainColor,justifyContent:'center',alignItems:'center'
},
card:{backgroundColor:'white',width:responsiveWidth(90),height:responsiveHeight(30),borderRadius:10,padding:10,alignItems:'center',marginBottom:30},
successIconStyle:{width:55,height:55},
successText:{color:'#27ae60',fontSize:responsiveFontSize(2.5),fontWeight:'900',marginVertical:10},
amountPaidText:{fontSize:responsiveFontSize(2),fontWeight:'500',marginVertical:2}
})