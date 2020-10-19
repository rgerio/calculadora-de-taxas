import React, {useCallback, useState} from 'react';
import {StyleSheet, View, Text, Switch} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Main: React.FC = () => {
  // const [installments, setInstallments] = useState(0);
  const [chargeConvenienceFee, setChargeConvenienceFee] = useState(true);

  const toggleChargeConvenienceFee = useCallback(
    () => setChargeConvenienceFee((previousState) => !previousState),
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>R$ 100.000,00</Text>
        <Text style={styles.priceDescription}>Valor da venda</Text>
      </View>

      <View style={styles.settingsContainer}>
        <View style={styles.installmentsContainer}>
          <RNPickerSelect
            placeholder={{}}
            doneText="Pronto"
            useNativeAndroidPickerStyle={false}
            style={pickerSelectStyles}
            onValueChange={(value) => console.log(value)}
            items={[
              {label: 'Débito (1.9%)', value: '0'},
              {label: 'Crédito - 1 parcela', value: '1'},
              {label: 'Crédito - 2 parcela', value: '2'},
              {label: 'Crédito - 3 parcela', value: '3'},
              {label: 'Crédito - 4 parcela', value: '4'},
              {label: 'Hockey', value: 'hockey'},
            ]}
            Icon={() => {
              return <Icon name="arrow-drop-down" size={30} color="gray" />;
            }}
          />
        </View>

        <View style={styles.chargeConvenienceFeeContainer}>
          <Text style={styles.chargeConvenienceFeeText}>Repassar taxa?</Text>
          <Switch
            style={styles.chargeConvenienceFeeSwitch}
            // trackColor={{false: '#767577', true: '#81b0ff'}}
            // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleChargeConvenienceFee}
            value={chargeConvenienceFee}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  priceContainer: {
    // backgroundColor: '#ffccff',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingVertical: 16,
  },
  priceText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  priceDescription: {
    fontSize: 16,
  },

  settingsContainer: {
    // backgroundColor: '#bbbbff',
    width: '100%',
    marginTop: 16,
  },

  installmentsContainer: {
    // backgroundColor: '#bbbbee',
    backgroundColor: '#fff',
    height: 64,
    justifyContent: 'center',
    padding: 16,
  },

  chargeConvenienceFeeContainer: {
    // backgroundColor: '#bbffff',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    marginTop: 8,
    padding: 16,
  },
  chargeConvenienceFeeText: {
    fontSize: 16,
  },
  chargeConvenienceFeeSwitch: {},
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 0,
    color: 'black',
    paddingRight: 30,
  },
});

export default Main;
