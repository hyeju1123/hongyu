package com.hongyu;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

// react-native-screens package requires one additional configuration step to properly work on Android devices.
import android.os.Bundle;
import android.content.res.Configuration;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "hongyu";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }

  /**
   * react-native-screens package requires one additional configuration step to properly work on Android devices.
   */
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    int nightFlag = getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
    boolean isDark = Configuration.UI_MODE_NIGHT_YES == nightFlag ;
    setTheme(isDark ? R.style.DarkTheme : R.style.LightTheme);
    SplashScreen.show(this);
    super.onCreate(null);
  }
}
