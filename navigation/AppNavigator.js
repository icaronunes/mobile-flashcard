import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import { connect } from 'react-redux'


const AppNavigator = createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html    
   Main: MainTabNavigator,
   //List: ListCardView,   
  })
);

export default connect()(AppNavigator)
