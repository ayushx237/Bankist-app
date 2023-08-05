'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
console.log(accounts);
//using find method 
const output=accounts.find(map=>map.owner==='Sarah Smith');
console.log(output);



// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


  //creating usernames  'Steven Thomas Williams' to stw

  const createusername=function(accs){
    accs.forEach(function(acc){
     
     acc.username= acc.owner.toLowerCase().split(' ').map(value=>value[0]).join('');
         console.log(acc.username);
});
  };
//adding event listner to the login system

var currAcc;

btnLogin.addEventListener('click',function(e){
  //prevent form from submitting
  createusername(accounts);
  e.preventDefault();

 currAcc=accounts.find(acc=>acc.username ===      inputLoginUsername.value)
  
  console.log(currAcc);

  if(currAcc.pin===Number(inputLoginPin.value)){
    startlogouttimer();
    containerApp.style.opacity=100;

    inputLoginUsername.value="";
    inputLoginPin.value="";
    inputLoginPin.blur();

    labelWelcome.textContent=`welcome ${ currAcc.owner}`
    updateui(currAcc);

  }
  else{
    inputLoginUsername.value="";
    inputLoginPin.value="";
  }
  
 

});

//adding event listener to TRANSFER MONEY

btnTransfer.addEventListener('click',function(e){
  e.preventDefault();

  //amount to transfer
  const amount=Number(inputTransferAmount.value);
  //senders account name
  const recieversacc=accounts.find(acc=>acc.username===inputTransferTo.value);
console.log(amount,recieversacc);
  if(amount>0 && recieversacc && currAcc.balance>=amount && recieversacc.username!==currAcc.username ){
    //console.log(currAcc);
    console.log('transfer valid');
    
    currAcc.movements.push(-amount);
    recieversacc.movements.push(amount);

    updateui(currAcc);
inputTransferAmount.value="";
inputTransferTo.value="";

  }
  
})

//adding event listener to close account
btnClose.addEventListener('click',function(e){
  e.preventDefault();
  if( inputCloseUsername.value===currAcc.username  && Number(inputClosePin.value)===currAcc.pin){
const index=accounts.findIndex(acc=>acc.username===currAcc.username);
console.log(index);
accounts.splice(index,1);
console.log(accounts);
containerApp.style.opacity=0;

labelWelcome.textContent="login to get started";
  }

})
//adding event listener to loan 
btnLoan.addEventListener('click',function(e){
  e.preventDefault();

const amount=Number(inputLoanAmount.value);
if(amount>0 && currAcc.movements.find(mov=>mov>=amount*0.1)){
  setTimeout(
    ()=>
{  
currAcc.movements.push(amount);
updateui(currAcc);},2500);

}

inputLoanAmount.value="";
})
//adding event listener to sort  button
btnSort.addEventListener('click',function(e){
  e.preventDefault();
  currAcc.movements.sort((a,b)=>{
    //in asscending order
    if(a>b) {return 1};
    if(b>a) {return -1};
  });
  updateui(currAcc);
})
function updateui(accs){
//displaying movements
calcdisplayy(currAcc);

//displaying balance abd displaying on the result
calcbalance(currAcc);
//displaying money deposited in total
calcdisplaysummaryin(currAcc);
//displaying money withdrawlin total
calcdisplaysummaryout(currAcc);
////displaying interest rate in total
calcdisplaysummaryinterest(currAcc);
}
//creating present date 
function creatingdate(){
  const now=new Date();
  
  const onlydate=now.getDate();
  const month=now.getMonth();
  const year=now.getFullYear();
  const hour=now.getHours();
  const minute=now.getMinutes();
  
  labelDate.textContent=`${month}/${onlydate}/${year} ${hour}:${minute}`;
  console.log(now);
  };
  creatingdate();

  //working with timer
  const startlogouttimer=function(){
    let time=120;
  const intervaltime=setInterval(function(){
  const min=String(Math.trunc(time/60)).padStart(2,0);
  const sec= String(time%60).padStart(2,0);
  labelTimer.textContent=`${min}:${sec}`;
  time--;
  if(time===0){
    clearInterval(intervaltime);
    labelWelcome.textContent="login to get started";
    containerApp.style.opacity=0;

  }
},1000);


 
  }
  
//displaying the movements 

const calcdisplayy =function(accs){
    containerMovements.innerHTML="";
    accs.movements.forEach(function(mov,i ) {
      const type=mov>0? 'deposit':'withdrawal';
  
      const html=`
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
    <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
      `;
      containerMovements.insertAdjacentHTML('afterbegin',html);
    });
  
  };
//to calculate final balance value and updating it on the result!!
const calcbalance=function(accs){
  accs.balance=accs.movements.reduce((acc,val)=>acc+val,0);
  labelBalance.textContent=`${accs.balance.toFixed(2)}euro`;
}
//to calculate final result of deposit(incoming amount)(means amount greater then zero)

const calcdisplaysummaryin=function(accs){
  accs.final=accs.movements.filter(mov=>mov>0).reduce((acc,mov)=>acc+mov,0);
  labelSumIn.textContent=`${accs.final.toFixed(2)}€`;
}

//to calculate final result of withdrawl(outgoing amount)(means amount lesser then zero)
const calcdisplaysummaryout=function(accs){
  accs.final=accs.movements.filter(mov=>mov<0).reduce((acc,mov)=>acc+mov,0);
  labelSumOut.textContent=Math.abs(accs.final.toFixed(2))+'€';
}

//to calculate interest rate of total deposit

const calcdisplaysummaryinterest=function(account){
  const interest=account.movements.filter(map=>map>0).map(val=>(val*account.interestRate)/100).reduce((acc,val)=>acc+val,0);
  labelSumInterest.textContent=`${interest.toFixed(2)}€`;
}




/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//to calculating the maximum value among the movements!!
function calmax(movements){
  let max=movements[0];
  for(let i=0;i<movements.length;i++){
    if(movements[i]>max)
    max=movements[i];
  }
  console.log(max);
  }
  
  calmax(account4.movements);
  


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

//const newmovement=movements.filter(function(mov){
  //return mov<0;

  //instead using arrow function
  const newmovement=movements.filter(mov => mov<0
);

console.log(newmovement);
console.log(movements);

/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const arr=['1','2','3','4','5'];
//console.log([arr.splice(-1)]);
console.log(arr.splice(2,3));
console.log(arr);
*/



const dogsjulia=[10,2,5,8,10];
const dogskate=[1,12,3,8,2];

function checkdogs(dogsjulia,dogskate){
const dogsjuliacorrected=dogsjulia.slice();
 dogsjuliacorrected.splice(0,1);
dogsjuliacorrected.splice(-2);
  
  console.log(dogsjuliacorrected);
 const newdogs=[...dogsjuliacorrected,...dogskate];
 console.log(newdogs);
//-----SYSTUUM-----------!!

newdogs.forEach(function(dog,i){
  const value = dog>=3? 'adult' :'puppy';
  console.log(`dog number${i+1} is an ${value}, and is ${dog} years old`);
})
}

checkdogs(dogsjulia,dogskate);


//this time we have to convert dog's age into humans age and to calc avg age of dogs



//practice 2 using map method becuase it converts old map into a new map
const newdog=[2,7,3];
const caclaveragehumanage=function(newdogs){
  const humanAge=newdogs.map(val=> (val<=2? val*2:val*4+16));
console.log(humanAge);

  const adults=humanAge.filter(map=> map>=18);
  console.log(adults);
 
const calcavg=adults.reduce(function(acc,val){
return acc+val;
},0)/adults.length;
return calcavg;
};

console.log(caclaveragehumanage(newdog));

//practice 2 of dog using chain method
const newdogg=[2,7,3];
const newhumanage=function(arr){
  const heavy=
arr
.map(val=>(val<=2 ? val*2 :val*4+16))
.filter(val=>(val>=18))
.reduce((acc,vale,i,arr)=>acc+vale/arr.length,0);
return heavy;
}
console.log(newhumanage(newdogg));
console.log(Math.trunc(1.8));
console.log(Math.round(1.48));

console.log(2 ** (3 ** 2));
console.log(15n>16);
const now= new Date();
console.log(now);