export default class BasicFunction {
    dateFun(date){
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [ month, day, year].join('/');
    }
    dateFun2(date){
      var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      return [month,day,year].join('/');
  }
    dateTimeAmPm(date){
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
                "July", "Aug", "Septr", "Oct", "Nov", "Dec"];
      var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
      const time = d.getHours();
      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;
      const monthnameis=monthNames[month-1]; 
      const dateis = monthnameis+' '+day+','+ year +' ' ;
      var hours = d.getHours();
      var minutes = d.getMinutes();
      var ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
      return dateis + strTime;
  }
 
    plusMinus(data){
        if(data>=0){
         return 'plus mdi mdi-menu-up';
        //  mdi-triangle
        }else{
         return 'minus mdi mdi-menu-down';
        }
       return data;
    }
    currancyAdd(number){
      if(number>=0){
        return "$"+number;
      }else{
        return '-$'+ Math.abs(number);
      }
    }
    nombarFormat(nbr){
      if(nbr == 0 && nbr == ''){
         return '0.00';
      }else{
        if(nbr){
          var nr = nbr.toFixed(2);
          nr = nr.toString();
            var pattern = /(-?\d+)(\d{3})/;
            while (pattern.test(nr))
            nr = nr.replace(pattern, "$1,$2");
          return nr;
        }else{
          return 0.00;
        }
      }
    }
    currancyAddWithNumber(number){
      if(number){
         var number = number.toFixed(2);
         if(number>=0){
          number = number.toString();
          var pattern = /(-?\d+)(\d{3})/;
          while (pattern.test(number))
          number = number.replace(pattern, "$1,$2");
          return "$"+number;
        }else{
          var num= Math.abs(number);
          num= num.toFixed(2)
          num = num.toString();
          var pattern = /(-?\d+)(\d{3})/;
          while (pattern.test(num))
          num = num.replace(pattern, "$1,$2");
          return "-$"+num;
        }
      }else{
        return '$0.00';
      }
     
    }
    priceColor(data){
      if(data>=0){
        return 'plus';
         }else{
        return 'minus';
       }
    }
    graphColor(data){
      if(data>=0){
        return 'bg-success ';
         }else{
        return 'bg-danger';
       }
    }
    getPositiveValue(data){
      if(data>=0){
        return data;
         }else{
        return data;
       }
    }
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    optionNameSplit(string){
      if(string){
        if(string.length<=6){
           return string;
        }else{
          var array = string.split('');
          var newArray=[];
          var str ='';
          var num = '';
          for(var i=0 ; i<= array.length ; i++){
            var charValue= array[i];
            if(isNaN(charValue)){
              str = str+charValue;
              if(num !==''){
                newArray.push(num);
              }
              num ='';
            }else{
                 if(isNaN(charValue)){
                 }else{
                  if(str !==''){
                    newArray.push(str);
                  }
                  num = num+charValue;
                  }
                  str='';
                }
           }
          
           var dateString=newArray[1];
           var symbolString=newArray[0];
           var cAndP='';
           var cAndPValue=0;
           if(newArray[2]==='C'){
              cAndP='Call';
           }else{
            if(newArray[2]==='P'){
              cAndP='Put';
             }
           }
           var str = dateString; 
           var year = '20'+str.slice(0,2);
           var month = str.slice(2,4);
           var date = str.slice(4,6);
          var lastValue=parseFloat(newArray[3])/1000;
          lastValue= lastValue.toFixed(1);
          lastValue = lastValue.toString();
          var pattern = /(-?\d+)(\d{3})/;
          while (pattern.test(lastValue))
          lastValue = lastValue.replace(pattern, "$1,$2");
          var retrunValue=month+'/'+date+'/'+year+' '+symbolString+" "+ lastValue + " "+cAndP;
          return retrunValue;
        }
       
      }
     
    }
    timeConverter(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      if(min<10){
        min ="0"+min;
      }
      var ampm='AM';
      var timeis='';
      if(hour<=12){
        timeis=hour + ':'+min +'AM';
      }else{
        hour = parseFloat(hour)-12;
        timeis=hour + ':'+min +'PM'
      }
      var res= hour + ':' + min;
      return timeis;
    }
    currentDate(){
      var d = new Date();
      var year=parseInt(d.getYear())-100;
      var month=d.getMonth()+1;
      return '20'+year+'/'+month+'/'+d.getDate();
    }
    currentDateYesterday(){
      var d = new Date();
      var year=parseInt(d.getYear())-100;
      var month=d.getMonth()+1;
      var yesterday = new Date(d.getTime());
      yesterday.setDate(d.getDate() - 1);
      var date=yesterday.getDate();
      return '20'+year+'/'+month+'/'+date;
    }
    currentDateBeforeDay(beforeDay){
      var d = new Date();
      var cureentdate=d.getDate();
     
      
     
      var yesterday = new Date(d.getTime());
      yesterday.setDate(d.getDate() - parseInt(beforeDay));
      var date=yesterday.getDate();
      var year=parseInt(yesterday.getYear())-100;
      var month=yesterday.getMonth()+1;
      // if(month==1){
      //   if(cureentdate<=beforeDay){
      //     year=parseFloat(year)-1;
      //     return '20'+year+'/'+12+'/'+date;
      //   }else{
      //     return '20'+year+'/'+month+'/'+date;
      //   }
        
      // }else{
      //   return '20'+year+'/'+month+'/'+date;
      // }
      return '20'+year+'/'+month+'/'+date;
      
    }
    currentDateBeforeMonth(beforeMonth){
      var d = new Date();
      d.setMonth(d.getMonth() - parseInt(beforeMonth));
      var month=d.getMonth()+parseInt(1);
      var year=parseInt(d.getYear())-100;
      return '20'+year+'/'+month+'/'+d.getDate();
      
    }
    currentDateBeforeYear(beforeYear){
      var d = new Date();
      var month=d.getMonth()+parseInt(1);
      var year=parseInt(d.getYear())-100;
      year = year-parseInt(beforeYear);
      return '20'+year+'/'+month+'/'+d.getDate();
     
    }
    
    GetFullForm(shortName){
      var fullname='';
      switch(shortName){
        case 'day':
            fullname='Day';
        break;
        case 'gtc':
            fullname='Good Till Canceled';
        break;
        case 'pre':
            fullname='Pre Market';
        break;
        case 'buy':
            fullname='Buy';
        break;
        case 'buy_to_cover':
            fullname='Buy To Cover';
        break;
        case 'sell':
            fullname='Sell';
        break;
        case 'sell_short':
            fullname='Sell Short';
        break;
        case 'market':
            fullname='Market';
        break;
        case 'limit':
            fullname='Limit';
        break;
        case 'stop':
            fullname='Stop';
        break;
        case 'stop_limit':
            fullname='Stop Limit';
        break;
        case 'buy_to_open':
        fullname='Buy to Open';
        break;
        case 'buy_to_close':
            fullname='Buy To Close';
        break;
        case 'sell_to_open':
            fullname='Sell to Open';
        break;
        case 'sell_to_close':
            fullname='Sell to Close';
        break;
        default :
           fullname=shortName;
        break;

      }
      return fullname;
     
    }

    orderSideSelectionFunction(buySell,openClose,type){
      var reply ='';
        if(buySell==='buy'){
              if(openClose==='open'){
                 if(type==='option'){
                  reply='buy_to_open';
                 }else{
                  reply='buy';
                }
              }else{
                if(openClose==='close'){
                  if(type==='option'){
                    reply='buy_to_close';
                  }else{
                    reply='buy_to_cover';
                  }
                }
              }
        }else{
          if(buySell==='sell'){
                if(openClose==='open'){
                  if(type==='option'){
                    reply='sell_to_open';
                  }else{
                    reply='sell_short';
                  }
                }else{
                if(openClose==='close'){
                  if(type==='option'){
                    reply='sell_to_close';
                  }else{
                    reply='sell';
                  }
                }
              }
          }
        }
        return reply;
    }

    graphWidthEquaty(graphSize,graphType){
     var width=graphSize;
     var reply=graphSize;
     var replysmall=graphSize;
     var replyReturn=0;
      if(graphSize>=1024){
        reply = 693;
        replysmall=305
      }else{
        if(graphSize>=600){
          reply = 520;
          replysmall=520
         }
        else{
            if(graphSize>=350){
              reply = 350;
              replysmall=350
            }else{
              reply = 300;
              replysmall=300
             }
        }
     }
     switch(graphType){
       case 'big':
          replyReturn=reply;
       break;
       case 'small':
          replyReturn=replysmall;
       break;
       default:
          replyReturn=graphSize;
       break;
     }
     return replyReturn;
  }
  graphColorPostion(data){
    if(data>=0){
      return '#1fa764';
       }else{
      return '#ed5454';
     }
  }
  graphColorFillPostion(data){
    if(data>=0){
      return '#abe5c1';
       }else{
      return '#ffa1a9';
     }
  }
}