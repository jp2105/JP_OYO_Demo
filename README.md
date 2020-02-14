//install package
npm install

//start packager
npm start or yarn start or react-native start
npm start or yarn start or react-native start

// run in ios
react-native run-ios

// run in android
react-native run-android

In node_modules/react-native-calendars/src/calendar-list/index.js 
Pass
   {...this.props}
In  
  renderCalendar()
  
In /node_modules/react-native-calendars/src/calendar-list/item.js 
Pass 
   {...this.props}
In
    <Calendar></Calendar> 
    
in node_modules/react-native-calendars/src/calendar/index.js
Pass
    {...this.props}
In
    <DayComp></DayComp>
    
In node_modules/react-native-calendars/src/calendar/day/basic/index.js
--> Import
        import Icon from 'react-native-vector-icons/Ionicons';
    
--> line no. 84  Replace code 
        return (
              <TouchableOpacity
                testID={this.props.testID}
                style={containerStyle}
                onPress={this.onDayPress}
                onLongPress={this.onDayLongPress}
                activeOpacity={marking.activeOpacity}
                disabled={marking.disableTouchEvent}
                accessibilityRole={isDisabled ? undefined : 'button'}
                accessibilityLabel={this.props.accessibilityLabel}
              >
                <Text allowFontScaling={false} style={textStyle}>{String(this.props.children)}</Text>
                {dot}
              </TouchableOpacity>
            );
            
     with 
             if(marking.selected) {
               return (
                   <View>
                     <Icon
                         style={{
                           position:'absolute',zIndex:1000,top:-23,left:6}}
                         name={this.props.markedDates[this.props.date.dateString].arrorType=== 'checkIn'?'ios-arrow-round-forward':'ios-arrow-round-back'} size={30} color={'red'}
                     ></Icon>
                     <TouchableOpacity
                         testID={this.props.testID}
                         style={containerStyle}
                         onPress={this.onDayPress}
                         onLongPress={this.onDayLongPress}
                         activeOpacity={marking.activeOpacity}
                         disabled={marking.disableTouchEvent}
                         accessibilityRole={isDisabled ? undefined : 'button'}
                         accessibilityLabel={this.props.accessibilityLabel} z>
                       <Text allowFontScaling={false} style={textStyle}>{String(this.props.children)}</Text>
                       {dot}
                     </TouchableOpacity>
                   </View>
               );
             }else {
               return (
                   <View>
                     <TouchableOpacity
                         testID={this.props.testID}
                         style={containerStyle}
                         onPress={this.onDayPress}
                         onLongPress={this.onDayLongPress}
                         activeOpacity={marking.activeOpacity}
                         disabled={marking.disableTouchEvent}
                         accessibilityRole={isDisabled ? undefined : 'button'}
                         accessibilityLabel={this.props.accessibilityLabel} z>
                       <Text allowFontScaling={false} style={textStyle}>{String(this.props.children)}</Text>
                       {dot}
                     </TouchableOpacity>
                   </View>
               );
             }