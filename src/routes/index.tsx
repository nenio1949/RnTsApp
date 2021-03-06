import React from 'react';
import { TouchableOpacity, useColorScheme, View } from 'react-native';
import { Provider } from 'mobx-react';
import stores from '@/stores';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute, NavigationContainer, useNavigation, DarkTheme, DefaultTheme } from '@react-navigation/native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import TabNavigator from './tabNavigator';
import LoginScreen from '@/pages/common/login';
import UserInfoDetailScreen from '@/pages/user/detail';
import AddressManagerScreen from '@/pages/user/adress';
import UpdateAddressScreen from '@/pages/user/adress/update';
import OrderScreen from '@/pages/user/order';
import SettingSreen from '@/pages/user/setting';

const Stack = createStackNavigator();

const router = [
  {
    name: "/",
    title: "东东商城",
    component: TabNavigator,
    headerShown: false,
  },
  // 下面只需要配置非tabbar页面路径
  {
    name: "Login",
    title: "登录",
    component: LoginScreen,
    headerShown: false,
  },
  {
    name: "UserInfoDetail",
    title: "个人信息",
    component: UserInfoDetailScreen,
    headerShown: true,
  },
  {
    name: "AddressManager",
    title: "地址管理",
    component: AddressManagerScreen,
    headerShown: true,
  },
  {
    name: "UpdateAddress",
    title: "编辑收货地址",
    component: UpdateAddressScreen,
    headerShown: false,
  },
  {
    name: "Order",
    title: "我的订单",
    component: OrderScreen,
    headerShown: true,
  },
  {
    name: "Setting",
    title: "设置",
    component: SettingSreen,
    headerShown: true,
  },
];

/** header左侧内容 */
const HeaderLeft = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => { navigation.canGoBack() && navigation.goBack(); }}>
      <View style={{ paddingLeft: 10 }}>
        <AntDesignIcons name='left' size={25} color={useColorScheme() === 'dark' ? 'white' : 'black'} />
      </View>
    </TouchableOpacity>
  );
};

const StackNavigator = () => {

  // 从子导航器获取路由名称
  const getChildTitle = (route: any) => {
    const routeName = getFocusedRouteNameFromRoute(route);
    return routeName;
  };

  return (
    <Provider {...stores}>
      <NavigationContainer theme={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName='/'
        >
          {
            router.map((item, index) => {
              return (
                <Stack.Screen key={index} name={item.name} component={item.component} options={({ route }) => ({
                  title: getChildTitle(route) || item.title,
                  headerTitle: getChildTitle(route) || item.title,
                  headerTitleAlign: 'center',
                  headerLeft: HeaderLeft,
                  headerLeftLabelVisible: false, // 不显示header左侧文字
                  headerShown: item.headerShown, // 是否显示头部标题
                })} />
              );
            })
          }
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default StackNavigator;
