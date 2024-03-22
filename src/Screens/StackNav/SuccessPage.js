import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import Colors from '../../Constants/Colors';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ImagePath from '../../Constants/ImagePath';
import { Button } from '../../Components';
import NavigationString from '../../Constants/NavigationString';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loader from '../../Components/Loader';
import { IP } from '../../Constants/Server';

const SuccessPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params || {};

  const user_id = route?.params?.user_id;
  const session_id = route?.params?.session_id;

  const [isLoading, setIsLoading] = useState(false);
  const [datetime, setTi] = useState(null)
  // const [session_id, setSession_id] = useState("")
  console.log("userId", session_id);

  const Data = [
    { id: "price_1OubUKGJyA6XB6N0WhxsKaUs", price: '13$/month', name: 'MONTHLY SUBSCRIPTION' },
    { id: "price_1OubUEGJyA6XB6N0xrnl0l0x", price: '13$/month', name: '3 MONTH SUBSCRIPTION' },
  ];

  const selectedMembership = Data.find(option => option.id === id);

  useEffect(() => {
    const handleAddMembership = async () => {
      // setIsLoading(true);

      try {
        if (!selectedMembership) {
          throw new Error("Selected membership not found");
        }

        let renewalDays = 0;

        // Set different renewalDays based on membership name
        switch (selectedMembership.name.toLowerCase()) {
          case "monthly subscription":
            renewalDays = 30;
            break;
          case "3 month subscription":
            renewalDays = 90;
            break;
          default:
            throw new Error("Invalid membership type");
        }

        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

        const nextRenewalDate = addDays(currentDate, renewalDays); // Calculate the next renewal date
        setTi(nextRenewalDate)
        const response = await fetch(`${IP}/payment/add-membership-record?session_id=${session_id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            membershipType: selectedMembership.name,
            renewalDays,
            userId: user_id, // Access userId from route parameters
            status: "active",
            lastRenewalPaymentDate: nextRenewalDate, // Use current date
            stripeCustomerId: session_id

          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to add membership: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Membership addeds successfully:', data);
      } catch (error) {
        console.error('Error adding membership:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    // Call the handleAddMembership function
    handleAddMembership();
  }, [session_id]);


  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.card}>
        <Image source={ImagePath.successIcon} style={styles.successIconStyle} />
        <Text style={styles.successText}>payment   Successful    </Text>
        <Text style={styles.amountPaidText}>Membership purchase successful for {selectedMembership.name}</Text>
        <Text style={styles.amountPaidText}>Last Renewal PaymentDate : {datetime} </Text>
      </View>
      <Button w={30} h={5} br={6} title={'HOME'} onPress={() => navigation.navigate(NavigationString.VIP_TIPS)} />
      {isLoading ? <Loader /> : null}
    </SafeAreaView>
  )
}

export default SuccessPage;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, backgroundColor: Colors.mainColor, justifyContent: 'center', alignItems: 'center'
  },
  card: { backgroundColor: 'white', width: responsiveWidth(90), height: responsiveHeight(30), borderRadius: 10, padding: 10, alignItems: 'center', marginBottom: 30 },
  successIconStyle: { width: 55, height: 55 },
  successText: { color: '#27ae60', fontSize: responsiveFontSize(2.5), fontWeight: '900', marginVertical: 10 },
  amountPaidText: { fontSize: responsiveFontSize(2), fontWeight: '500', marginVertical: 2 }
})

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toISOString().split('T')[0];
}
