package com.hongyu

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

// react-native-screens package requires one additional configuration step to properly work on Android devices.
import android.os.Bundle;
import android.content.res.Configuration;
import org.devio.rn.splashscreen.SplashScreen;

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "hongyu"
  

  /**
   * Returns the instance of the [link ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to easily enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate = DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

  /**
   * react-native-screens package requires one additional configuration step to properly work on Android devices.
   */
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    val nightFlag = resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK
    val isDark = nightFlag == Configuration.UI_MODE_NIGHT_YES
    setTheme(if (isDark) R.style.DarkTheme else R.style.LightTheme)

    SplashScreen.show(this)
  }
}
