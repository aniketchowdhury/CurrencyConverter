import {data} from "./mainData/data";
import _ from "underscore";
export const currencyConversion = (currency1,currency2,arr1)=>{
    let arr=arr1;
    let hold1;
    if(currency1===currency2)
    arr.push(1);
    else{
        data.forEach(item=>{
            if(item.currency===currency1){
                if(currency2 in item.rates)
                {
                    arr.push(item.rates[currency2]);
                }
                else if(currency2 in item.cross)
                {
                    if(!_.isEqual(item.cross[currency2],"INV") && !_.isEqual(item.cross[currency2],"D"))
                    {
                        let crosser = item.cross[currency2];
                        hold1 = item.rates[crosser];
                        !_.isUndefined(hold1)&& arr.push(hold1);
                        currencyConversion(crosser,currency2,arr);
                    }
                    else if( _.isEqual(item.cross[currency2],"INV")){
                        currencyConversion(currency2,currency1,arr)
                    }
                }

            }
        })
    }
        return arr;
}

export const calculator=(money1,arr)=>{
    let res = 1;
    arr.forEach(item=>{
        res=item*res;
    });
    return Number(res*money1);
}
