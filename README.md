# Location-based APP
## Installation & Setup Environment
### 1. Fork the repository to your Github
Everyone should use his own repository to develop a new feature, and then make a `pull request` (PR) for requesting merging the code into master branch. So, first of all, you should click the `Fork` button which is at the top-left of the Github to make a new copy of the repository to your own.
[Screenshot](https://drive.google.com/open?id=0B7nEHGVPFeE9dG5tc1VQdmJKbkk)

### 2. Clone the code into your local environment
Use `Git clone` to clone a mirror copy of code to your dist (Run the command on your terminal):
`git clone https://github.com/[YOUR USERNAME]/lbs_ad_app.git`

### 3. Install `react-native-cli` globally
Make sure that, you have to install Node.js previously. It is recommended to install Node.js through [nvm](https://github.com/creationix/nvm). Then, run the following command in your terminal:
`npm install -g react-native-cli`

### 4. Run the APP in both iOS and Android platforms:
#### To run your app on iOS:
>
cd lbs_ad_app
react-native run-ios
`- or -`
Open deals99_app/ios/Deals99.xcodeproj in Xcode
Hit the Run button

#### To run your app on Android:
>
Have an Android emulator running (quickest way to get started), or a device connected
cd lbs_ad_app
react-native run-android


## Tech Stacks
1. [React Native](https://facebook.github.io/react-native/)
2. [Redux](http://redux.js.org/)
3. [Redux Action Tools](https://github.com/kpaxqin/redux-action-tools)
  - A related reference in Chinese: [Redux异步方案选型](http://react-china.org/t/redux/8761)
4. [Styled Components](https://www.styled-components.com/): strongly recommend to watch [the video](https://youtu.be/bIK2NwoK9xk) to gain the motivation of designing this library.
5. [NativeBase](https://docs.nativebase.io/)
6. [React Navigation](https://reactnavigation.org/)
