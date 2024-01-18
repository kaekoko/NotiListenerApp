
import AsyncStorage from "@react-native-async-storage/async-storage";
export function getname() {
   
        try {
          const value =  AsyncStorage.getItem('@MyApp:key');
          if (value !== null) {
        
            console.log(value);
          }
          return value;
        } catch (e) {
          console.error('Error loading value:', e);
          return e;
        }
    

}