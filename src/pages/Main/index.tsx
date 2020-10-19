import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Main: React.FC = () => {
  // const [installments, setInstallments] = useState(0);

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
            // useNativeAndroidPickerStyle={false}
            style={styles.installmentsPicker}
            onValueChange={(value) => console.log(value)}
            items={[
              {label: 'Football', value: 'football'},
              {label: 'Baseball', value: 'baseball'},
              {label: 'Hockey', value: 'hockey'},
            ]}
          />
        </View>
        <View>
          <Text>Repassar Taxa?</Text>
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
    backgroundColor: '#ffccff',
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
  settingsContainer: {},
  installmentsContainer: {},
  installmentsPicker: {},
});

export default Main;
