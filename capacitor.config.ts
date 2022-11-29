import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {

  plugins: {
    GoogleAuth :{
      scopes:['profile','email'],
      serverClientId: '219565146680-o5t692j82jd30vecqubu7v4dttuvb65v.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  },
  appId: 'io.ionic.starter',
  appName: 'pinder',
  webDir: 'www',
  bundledWebRuntime: false
};

export default config;
