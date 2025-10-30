import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "../context/authContext";
import LandingScreen from "../UI/LandingScreen";
import Login from "../UI/Login";
import Signup from "../UI/Signup";
import Notification from "../UI/Notification";
import ProductDetails from "../UI/ProductDetails";
import TabNavigator from "./TabNavigator";
import AppointmentDetails from "../UI/AppointmentDetails";
import EditProfile from "../UI/EditProfile";
import CancelOrder from "../UI/CancelOrder";
import OrderStatus from "../UI/OrderStatus";
import StatusDetails from "../UI/StatusDetails";
import WriteaReview from "../UI/WriteaReview";
import ChangePassword from "../UI/ChangePassword";
import OrderHistory from "../UI/OrderHistory";
import OrderStatusDetail from "../UI/OrderStatusDetail";
import ServiceDetailsScreen from "../UI/ServiceDetailsScreen";
import Checkout from "../UI/Checkout";
import AppointmentHistory from "../UI/AppointmentHistory";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false, animation: "default" }}
        >
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Products" component={ProductDetails} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Tab" component={TabNavigator} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen
            name="AppointmentDetails"
            component={AppointmentDetails}
          />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="CancelOrder" component={CancelOrder} />
          <Stack.Screen name="OrderStatus" component={OrderStatus} />
          <Stack.Screen name="StatusDetails" component={StatusDetails} />
          <Stack.Screen name="WriteaReview" component={WriteaReview} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="OrderHistory" component={OrderHistory} />
          <Stack.Screen
            name="OrderStatusDetail"
            component={OrderStatusDetail}
          />
          <Stack.Screen
            name="ServiceDetailsScreen"
            component={ServiceDetailsScreen}
          />
          <Stack.Screen
            name="AppointmentHistory"
            component={AppointmentHistory}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default StackNavigator;
