import { LogBox } from "react-native";

if (__DEV__) {
  const ignoreWarns = [
    "Cannot update a component",
    "NativeEventEmitter()",
    "EventEmitter.removeListener",
    "[fuego-swr-keys-from-collection-path]",
    "Setting a timer for a long period of time",
    "ViewPropTypes will be removed from React Native",
    "AsyncStorage has been extracted from react-native",
    "exported from 'deprecated-react-native-prop-types'.",
    "Non-serializable values were found in the navigation state.",
    "VirtualizedLists should never be nested inside plain ScrollViews",
    "EventEmitter.removeListener('appStateDidChange', ...): Method has been deprecated.",
    "Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`",
    "EventEmitter.removeListener('appStateDidChange', ...)",
    "EventEmitter.removeListener('appStateDidChange', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`.",
    "Warning: Failed %s type: %s%s, prop, Invalid prop `style` of type `array` supplied to `Row`, expected `object`., ",
  ];

  const warn = console.warn;
  LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
  // LogBox.ignoreAllLogs(); //
  console.warn = (...arg) => {
    for (const warning of ignoreWarns) {
      if (arg[0].startsWith(warning)) {
        return;
      }
    }
    warn(...arg);
  };

  LogBox.ignoreLogs(ignoreWarns);
}
