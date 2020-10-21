import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PaymentCondition from '../../paymentConditions/PaymentCondition';
import sumupPaymentConditions from '../../paymentConditions/sumupPaymentConditions';

const Main: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0); // Prices are multiplied by 100 to avoid decimal numbers
  const [clientPaysValue, setClientPaysValue] = useState(0);
  const [youReceiveValue, setYouReceiveValue] = useState(0);
  const [paymentConditions, setPaymentConditions] = useState<
    PaymentCondition[]
  >([]);
  const [selectedPaymentCondition, setSelectedPaymentCondition] = useState(0);
  const [shouldChargeFee, setShouldChargeFee] = useState(true);

  const toggleShouldChargeFee = useCallback(
    () => setShouldChargeFee((previousState) => !previousState),
    [],
  );

  const handlePressKeyboard = useCallback((key: number) => {
    if (key === -1) {
      // Erase key
      setPrice((oldValue) => Math.floor(oldValue / 10));
    } else if (key === 10) {
      // Double zero key
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
      // Number key
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

  const pikerItems = useMemo(() => {
    return paymentConditions.map((item, index) => {
      return {
        label: item.label,
        value: index,
      };
    });
  }, [paymentConditions]);

  useEffect(() => {
    if (!paymentConditions[selectedPaymentCondition]) {
      return;
    }

    const fee = paymentConditions[selectedPaymentCondition].fee / 100;
    const calculatedPrice = shouldChargeFee ? price / (1 - fee) : price;

    setClientPaysValue(Math.floor(calculatedPrice));
    setYouReceiveValue(Math.floor(calculatedPrice * (1 - fee)));
  }, [shouldChargeFee, price, paymentConditions, selectedPaymentCondition]);

  useEffect(() => {
    setPaymentConditions(sumupPaymentConditions);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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
            items={pikerItems}
            onValueChange={(_, index) => setSelectedPaymentCondition(index)}
            Icon={() => {
              return <Icon name="arrow-drop-down" size={30} color="gray" />;
            }}
          />
        </View>

        <View style={styles.shouldChargeFeeContainer}>
          <Text style={styles.shouldChargeFeeText}>Repassar taxa?</Text>
          <Switch
            style={styles.shouldChargeFeeSwitch}
            onValueChange={toggleShouldChargeFee}
            value={shouldChargeFee}
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
          <TouchableHighlight
            underlayColor="#d8dde1"
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(1)}>
            <Text style={styles.numberText}>1</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#d8dde1"
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(2)}>
            <Text style={styles.numberText}>2</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#d8dde1"
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(3)}>
            <Text style={styles.numberText}>3</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.keyboardLine}>
          <TouchableHighlight
            underlayColor="#d8dde1"
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(4)}>
            <Text style={styles.numberText}>4</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#d8dde1"
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(5)}>
            <Text style={styles.numberText}>5</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#d8dde1"
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(6)}>
            <Text style={styles.numberText}>6</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.keyboardLine}>
          <TouchableHighlight
            underlayColor="#d8dde1"
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(7)}>
            <Text style={styles.numberText}>7</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#d8dde1"
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(8)}>
            <Text style={styles.numberText}>8</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#d8dde1"
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(9)}>
            <Text style={styles.numberText}>9</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.keyboardLine}>
          <TouchableHighlight
            underlayColor="#d8dde1"
            style={styles.numberBorderlessContainer}
            onPress={() => handlePressKeyboard(10)}>
            <Text style={styles.numberText}>00</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#d8dde1"
            style={styles.numberContainer}
            onPress={() => handlePressKeyboard(0)}>
            <Text style={styles.numberText}>0</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#d8dde1"
            style={styles.numberBorderlessContainer}
            onPress={() => handlePressKeyboard(-1)}
            onLongPress={() => setPrice(0)}>
            <Icon name="backspace" size={24} color="gray" />
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  priceContainer: {
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
    width: '100%',
    marginTop: 16,
  },

  installmentsContainer: {
    backgroundColor: '#fff',
    height: 64,
    justifyContent: 'center',
    padding: 16,
  },

  shouldChargeFeeContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 64,
    marginTop: 8,
    padding: 16,
  },
  shouldChargeFeeText: {
    fontSize: 16,
  },
  shouldChargeFeeSwitch: {},

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
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 0,
    color: 'black',
    paddingRight: 30,
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 8,
    paddingRight: 30,
  },
  chevronUp: {
    display: 'none',
  },
  chevronDown: {
    display: 'none',
  },
});

export default Main;
