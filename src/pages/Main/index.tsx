import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View, Text, Switch} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Main: React.FC = () => {
  // const [installments, setInstallments] = useState(0);
  const [price, setPrice] = useState(0);
  const [clientPaysValue, setClientPaysValue] = useState(0);
  const [youReceiveValue, setYouReceiveValue] = useState(0);

  const [chargeConvenienceFee, setChargeConvenienceFee] = useState(true);

  const toggleChargeConvenienceFee = useCallback(
    () => setChargeConvenienceFee((previousState) => !previousState),
    [],
  );

  const handlePressKeyboard = useCallback((key: number) => {
    if (key === -1) {
      setPrice((oldValue) => Math.floor(oldValue / 10));
    } else if (key === 10) {
      setPrice((oldValue) => {
        const newValue1 = oldValue * 10;
        if (newValue1 > 99999999) {
          return oldValue;
        } else {
          const newValue2 = newValue1 * 10;
          if (newValue2 > 99999999) {
            return newValue1;
          } else {
            return newValue2;
          }
        }
      });
    } else {
      setPrice((oldValue) => {
        const newValue = oldValue * 10 + key;
        if (newValue > 99999999) {
          return oldValue;
        } else {
          return newValue;
        }
      });
    }
  }, []);

  useEffect(() => {
    setClientPaysValue(Math.floor(price * 1));
    setYouReceiveValue(Math.floor(price * 0.988));
  }, [price]);

  const moneyFormat = useCallback((value: number) => {
    const integerSlice = Math.floor(value / 100);
    const integerSliceStr = String(integerSlice).replace(
      /\B(?=(\d{3})+(?!\d))/g,
      '.',
    );
    return `R$ ${integerSliceStr},${String(value % 100).padStart(2, '0')}`;
  }, []);

  const formattedPrice = useMemo(() => {
    return moneyFormat(price);
  }, [price, moneyFormat]);

  const formattedClientPaysValue = useMemo(() => {
    return moneyFormat(clientPaysValue);
  }, [clientPaysValue, moneyFormat]);

  const formattedYouReceiveValue = useMemo(() => {
    return moneyFormat(youReceiveValue);
  }, [youReceiveValue, moneyFormat]);

  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{formattedPrice}</Text>
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

        <View style={styles.clientPaysContainer}>
          <Text style={styles.clientPaysLabel}>Seu cliente paga</Text>
          <Text style={styles.clientPaysValue}>{formattedClientPaysValue}</Text>
        </View>

        <View style={styles.youReceiveContainer}>
          <Text style={styles.youReceiveLabel}>Você recebe</Text>
          <Text style={styles.youReceiveValue}>{formattedYouReceiveValue}</Text>
        </View>
      </View>

      <View style={styles.keyboardContainer}>
        <View style={styles.keyboardLine}>
          <RectButton
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(1)}>
            <Text style={styles.numberText}>1</Text>
          </RectButton>
          <RectButton
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(2)}>
            <Text style={styles.numberText}>2</Text>
          </RectButton>
          <RectButton
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(3)}>
            <Text style={styles.numberText}>3</Text>
          </RectButton>
        </View>

        <View style={styles.keyboardLine}>
          <RectButton
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(4)}>
            <Text style={styles.numberText}>4</Text>
          </RectButton>
          <RectButton
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(5)}>
            <Text style={styles.numberText}>5</Text>
          </RectButton>
          <RectButton
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(6)}>
            <Text style={styles.numberText}>6</Text>
          </RectButton>
        </View>

        <View style={styles.keyboardLine}>
          <RectButton
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(7)}>
            <Text style={styles.numberText}>7</Text>
          </RectButton>
          <RectButton
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(8)}>
            <Text style={styles.numberText}>8</Text>
          </RectButton>
          <RectButton
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(9)}>
            <Text style={styles.numberText}>9</Text>
          </RectButton>
        </View>

        <View style={styles.keyboardLine}>
          <RectButton
            style={styles.numberBorderlessContainer}
            onPress={() => handlePressKeyboard(10)}>
            <Text style={styles.numberText}>00</Text>
          </RectButton>
          <RectButton
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(0)}>
            <Text style={styles.numberText}>0</Text>
          </RectButton>
          <RectButton
            style={styles.numberBorderlessContainer}
            onPress={() => handlePressKeyboard(-1)}>
            <Icon name="backspace" size={24} color="gray" />
          </RectButton>
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

  clientPaysContainer: {
    backgroundColor: '#3388ff',
    height: 80,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
  },
  clientPaysLabel: {
    color: '#fff',
    fontSize: 16,
  },
  clientPaysValue: {
    color: '#fff',
    fontSize: 24,
  },

  youReceiveContainer: {
    backgroundColor: '#49b85a',
    height: 80,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  youReceiveLabel: {
    color: '#fff',
    fontSize: 16,
  },
  youReceiveValue: {
    color: '#fff',
    fontSize: 24,
  },

  keyboardContainer: {
    marginVertical: 16,
  },
  keyboardLine: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  numberContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d8dde1',
    height: 64,
    marginHorizontal: 3,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: '31%',
  },
  numberBorderlessContainer: {
    height: 64,
    marginHorizontal: 3,
    marginVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: '31%',
  },
  numberText: {
    fontSize: 24,
  },
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
