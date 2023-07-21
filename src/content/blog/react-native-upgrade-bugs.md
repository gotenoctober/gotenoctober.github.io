---
title: Bugs and issues to be aware of when upgrading to React Native 0.71+
pubDate: 2023-07-21T14:00:00Z
---

One of my projects for [Groove](https://groove.ooo) was to upgrade React Native and all dependencies to their latest versions. In our case we were upgrading from React Native ` 0.67.x` to `0.71` and like most projects of this nature that presented quite a few unexpected gotchas along the way. Here I'll outline some that may be most relevant to other projects, including a few React Native bugs that are still unresolved as of this writing.

### Android: Poor performance when scrolling an inverted VirtualizedList (FlatList, SectionList, etc.)

[Bug report 1](https://github.com/facebook/react-native/issues/30034) &mdash; [Bug report 2](https://github.com/facebook/react-native/issues/35350)

Scrolling an inverted list on Android can result in slow performance or an unresponsive UI. This is a longstanding bug when building against Android API 33+.

**Status:** Unresolved as of React Native `0.72.3`. A fix _was_ merged but then reverted. A permanent fix appears to still be in [development](https://github.com/facebook/react-native/pull/38073).

**Workaround:** We had success using `patch-package` to tweak the styles applied by React Native as described in [this comment](https://github.com/facebook/react-native/issues/30034#issuecomment-806396274). You may run into issues with this if you rely on `onRefresh` or `refreshControl`.

### iOS: Multiline TextInput onKeyPress receives unexpected Backspace events

[Bug report](https://github.com/facebook/react-native/issues/37967)

The `onKeyPress` callback handler will sometimes receive Backspace events when the key was not pressed. What's interesting here is that this issue manifests itself differently in iOS 15 vs 16:

- iOS 15: The `Backspace` event is received after `value` is reset (such as to an empty string)
- iOS 16: The `Backspace` event is received on EVERY change AND when `value` is reset

**Status:** Not fixed as of `0.72.3`

**Workaround:** I was unable to find any workarounds for this so you may need to remove usage until a fix is available.

### iOS: Multiline TextInput onChangeText will not fire on first character after clearing

[Bug report](https://github.com/facebook/react-native/issues/37784)

Say you have a `TextInput` component that is regularly cleared after some interaction, such as in a chat interface. In this case, the first character typed _after_ clearing will not fire the `onChangeText` handler. This happens no matter how the value is cleared: whether by changing a reactive `value` prop OR via the `clear()` method.

**Status:** [Fix released](https://github.com/facebook/react-native/pull/37958) in `0.72.3` but _has not_ been backported to `0.71.x`

**Workaround:** This issue was introduced in React Native `0.71.8` so sticking to a previous version offers a temporary workaround if an upgrade to `0.72.3` isn't possible.

### iOS: react-native-reanimated 2.x will not build on 0.72+

[Bug report](https://github.com/software-mansion/react-native-reanimated/issues/4522)

C++ dialect incompatibilities cause a build failure on React Native `0.72+`. This was a problem for us because we were stuck on `react-native-reanimated` 2.x because of a dependency on `react-native-vision-camera`.

Here's the build log:

```
❌  /Users/jeff/Projects/groove/deps/react-native-app/RNReanimated2/ios/Pods/Headers/Public/React-cxxreact/cxxreact/NativeModule.h:28:26: no template named 'optional' in namespace 'std'; did you mean 'folly::Optional'?

using MethodCallResult = std::optional<folly::dynamic>;
                                  ^
❌  /Users/jeff/Projects/groove/deps/react-native-app/RNReanimated2/ios/Pods/Headers/Public/React-cxxreact/cxxreact/ModuleRegistry.h:50:3: no template named 'optional' in namespace 'std'; did you mean 'folly::Optional'?

  std::optional<ModuleConfig> getConfig(const std::string &name);
      ^
❌  /Users/jeff/Projects/groove/deps/react-native-app/RNReanimated2/ios/Pods/Headers/Public/React-jsiexecutor/jsireact/JSINativeModules.h:30:3: no template named 'optional' in namespace 'std'; did you mean 'folly::Optional'?

  std::optional<jsi::Function> m_genNativeModuleJS;
      ^
❌  /Users/jeff/Projects/groove/deps/react-native-app/RNReanimated2/ios/Pods/Headers/Public/React-jsiexecutor/jsireact/JSINativeModules.h:34:3: no template named 'optional' in namespace 'std'; did you mean 'folly::Optional'?

  std::optional<jsi::Object> createModule(
      ^
❌  /Users/jeff/Projects/groove/deps/react-native-app/RNReanimated2/ios/Pods/Headers/Public/React-jsiexecutor/jsireact/JSIExecutor.h:131:3: no template named 'optional' in namespace 'std'; did you mean 'folly::Optional'?

  std::optional<jsi::Function> callFunctionReturnFlushedQueue_;
      ^
❌  /Users/jeff/Projects/groove/deps/react-native-app/RNReanimated2/ios/Pods/Headers/Public/React-jsiexecutor/jsireact/JSIExecutor.h:132:3: no template named 'optional' in namespace 'std'; did you mean 'folly::Optional'?

  std::optional<jsi::Function> invokeCallbackAndReturnFlushedQueue_;
      ^
❌  /Users/jeff/Projects/groove/deps/react-native-app/RNReanimated2/ios/Pods/Headers/Public/React-jsiexecutor/jsireact/JSIExecutor.h:133:3: no template named 'optional' in namespace 'std'; did you mean 'folly::Optional'?

  std::optional<jsi::Function> flushedQueue_;
      ^
```

**Status:** Not fixed as of `2.17.0`

**Workaround:** Changing the C++ dialect setting to match the new React Native `c++17` default _may_ resolve the issue ([mixed](https://github.com/software-mansion/react-native-reanimated/issues/4522#issuecomment-1623911300) [results](https://github.com/software-mansion/react-native-reanimated/issues/4522#issuecomment-1624267163)).
