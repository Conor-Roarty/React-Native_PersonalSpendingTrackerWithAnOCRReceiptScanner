/**
 * @format
 */
jest.unmock('../Screens/Home/HomeScreen');


//https://github.com/facebook/react-native/tree/master/RNTester/RNTesterUnitTests
import * from 'jest';
import 'react-native';
import React from 'react';
import App from '../App';
import Home from '../Screens/Home/HomeScreen';
import Analytics from '../Screens/Analytics/Analytics';
import AnalyticsTrips from '../Screens/Analytics/AnalyticsTrips';
import AnalyticsPersonal from '../Screens/Analytics/AnalyticsPersonal';
import Purchases from '../Screens/Purchases/PurchasesScreen';
import Trips from '../Screens/Trips/TripsScreen';
import Settings from '../Screens/Settings/SettingsScreen';
import Validation from '../Helpers/Validation';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
    renderer.create(<App />);
    renderer.create(<Home />);
    renderer.create(<Analytics />);
    renderer.create(<AnalyticsTrips />);
    renderer.create(<AnalyticsPersonal />);
    renderer.create(<Purchases />);
    renderer.create(<Trips />);
    renderer.create(<Settings />);
});

describe('ReactNativeTesting', () => {

  let component;
  let textInput;
  const defaultState = {text: ''};

  test('renders correctly', () => {
    const snapshot = renderer.create(<ReactNativeTesting />).toJSON();
    expect(snapshot).toMatchSnapshot();
  });


  beforeEach(() => {
    component = shallow(<ReactNativeTesting />);
    textInput = component.find('TextInput');
  });


  it('has default state', () => {
    expect(component.state()).toEqual(defaultState);
  });

  it('renders welcome text', () => {
    const expectedText = 'Welcome To Our Analytics, conorroarty';//testvalue is just developers username
    const text = component.find('Text').children().text();
    expect(text).toEqual(expectedText);
  });

  it('renders input field with placeholder', () => {
    const expectedPlaceholder = 'write something';
    expect(textInput.length).toBe(1);
    expect(textInput.props().placeholder).toEqual(expectedPlaceholder);
  });


  describe('when text changes', () => {

    const newTextValue = 'random string';

    beforeEach(() => {
      textInput.simulate('changeText', newTextValue);
    });

    it('updates component state', () => {
      expect(component.state().text).toEqual(newTextValue);
    });

    it('passes text from state to ReactNativeTestingChild', () => {
      const childComponent = component.find(ReactNativeTestingChild);
      expect(childComponent.props().text).toEqual(newTextValue)
    });


    describe('when clearText callback is called', () => {

      beforeEach(() => {
        const childComponent = component.find(ReactNativeTestingChild);
        childComponent.simulate('clear');
      });

      it('resets state', () => {
        expect(component.state()).toEqual(defaultState);
      });

    });

  });
  describe('Check Validation', () => {
        it('validDate DD/MM/YYYY', () => {
            Validation.validDate("10/10/2020")
        });
        it('validDate DD-MM-YYYY', () => {
            Validation.validDate("10-10-2020")
        });
        it('invalidDate Not A Real Date', () => {
            Validation.validDate("31/02/2020")// 31st Feb
        });
        it('invalidDate text', () => {
            Validation.validDate("not a valid date")
        });
        it('notNull', () => {
            Validation.notNull("not a valid date")
        });
        it('null', () => {
            Validation.notNull(null)
        });
        it('validNumber', () => {
            Validation.validNumber(20.67)
        });
        it('validNumber When It Is A String', () => {
            Validation.validNumber("20.67")//carries out conversion itself
        });
        it('invalidNumber', () => {
            Validation.validNumber("NUMBER1")
        });
        it('validDropDownSelection', () => {
            var array = ["value1","value2","value3","value4"]
            Validation.validDropDownSelection("value1", array)
        });
        it('invalidDropDownSelection', () => {
            var array = ["value1","value2","value3","value4"]
            Validation.validDropDownSelection("invalid", array)
        });
        it('validStringLength', () => {
            Validation.validLength("TestValid")
        });
        it('invalidStringLength Too Small', () => {
            Validation.validLength("a")
        });
        it('invalidStringLength Too Big', () => {
            Validation.validLength("123456789012345678901")
        });
        it('validReturnInput1', () => {
            Validation.inputReadable("valid")
        });
        it('invalidReturnInput1', () => {
            Validation.inputReadable("undefined")
        });
        it('invalidReturnInput2', () => {
            Validation.inputReadable("NaN")
        });
  });
});
