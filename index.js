const inputSlider = document.querySelector("[data-lengthSlider]");

const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");

const copyBtn = document.querySelector("[data-copy]");

const copyMsg = document.querySelector("[data-copyMsg]");                   

const uppercaseCheck = document.querySelector("#uppercase");

const lowercaseCheck = document.querySelector("#lowercase");

const numbersCheck = document.querySelector("#numbers");

const symbolsCheck = document.querySelector("#symbols");                

const indicator = document.querySelector("[data-indicator]");

const generateBtn = document.querySelector(".generateButton");      

const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '~`!@#$%^&*()_-+=}{[|\:;<,>.]?/'

let password = "";

let passwordLength = 10;

let checkCount = 0;

handleSlider();
// set strength circle to gray
setIndicator("#ccc");

// set password length
function handleSlider(){

    console.log('handle slider working fine')
    inputSlider.value = passwordLength;

    lengthDisplay.innerText = passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;
    // inputSlider.style.backgroundSize = ((passwordLength-min)*100/(max-min)) + "% 100%";

const percent = ((passwordLength - min) * 100) / (max - min);

 inputSlider.style.background = `linear-gradient(to right, #ffff ${percent}%, rgba(45, 32, 81, 0.688) ${percent}%)`;

}

function setIndicator(color){
    console.log('set indicator working fine')
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 4px 10px ${color}`;
}

function getRandomInt(min, max)
{
    console.log('get random working fine');
     // for getting no between 0 & 20
   return Math.floor(Math.random() * (max-min)) + min;
   
}

function generateRandomNumber(){

     console.log('get random integer working fine');
    return getRandomInt(0,9);
}

function generateLowerCase(){
    console.log('generate lowercase working fine')
    return String.fromCharCode(getRandomInt(97,123))
}

function generateUpperCase(){
    console.log('generate upper case working fine')
    return String.fromCharCode(getRandomInt(65,91))
}

function generateSymbol(){
    console.log('generate symbol working fine');
    const randomNum = getRandomInt(0, symbols.length)
    return symbols.charAt(randomNum);

}

function calcStrenght(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8)
        setIndicator("#0f0")
    else if((hasLower|| hasUpper) && (hasNum || hasSym) && passwordLength>=6)
        setIndicator("#ff0");
    else
        setIndicator("#f00");

    console.log('calc strength working fine')
}

async function CopyContent(){
   try{
    console.log('copy content working fine')
    await navigator.clipboard.writeText(passwordDisplay.value)
    copyMsg.innerText = "copied"
   }
   catch(e){
    copyMsg.innerText="Failed to copy"

   }

   // to make copy span visible    
   copyMsg.classList.add("active");

   setTimeout(()=> {
    copyMsg.classList.remove("active");
   },2000);
}

function shufflepassword(array){

    console.log('shufflepassword working fine')
    // Fisher Yates Method
    for(let i=Array.length-1; i>0; i--)
    {
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    let str = "";
    array.forEach((el)=> (str += el));
    return str;


}
inputSlider.addEventListener('input', (e)=> {
    console.log('input slider working fine')
    passwordLength = e.target.value;
    handleSlider();

}
)

copyBtn.addEventListener('click', ()=>{

    // if password is non empty
    if(passwordDisplay.value)
        CopyContent();

})


function handleCheckBoxChange(){
    console.log('handleCheckBox working fine')
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    })

    // special condition
    if(passwordLength< checkCount)
    {
        passwordLength = checkCount;
        handleSlider();
    }
        
}
allCheckBox.forEach((checkbox)=> {
    checkbox.addEventListener('change', handleCheckBoxChange)
})
generateBtn.addEventListener('click', ()=>{
//    none of the checkbox are selected

    console.log('generate password button working fine')
    if(checkCount==0) return;

    if(passwordLength< checkCount)
    {
        passwordLength = checkCount;
        handleSlider();
    }

    // lets start the journey to find new password

    // remove old password
    password = "";

    // lets put the stuff mentioned by checkboxes

    // if(uppercaseCheck.checked)
    //     password += generateUpperCase();

    // if(lowercaseCheck.checked)
    //     password+= generateLowerCase();

    // if(numbersCheck.checked)
    //     password+= generateRandomNumber();

    // if(symbolsCheck.checked)
    //     password+= generateSymbol();

let functArr = [];

    if(uppercaseCheck.checked)
    {
        functArr.push(generateUpperCase);
    }

    if(lowercaseCheck.checked)
    {
        functArr.push(generateLowerCase);
    }

    if(numbersCheck.checked)
    {
        functArr.push(generateRandomNumber);
    }

    if(symbolsCheck.checked)
    {
        functArr.push(generateSymbol);
    }

    // compulsary addition

    
    for(let i=0; i<functArr.length; i++)
    {
        console.log(functArr[i])
        password+= functArr[i]();
    }

    

    // remaining addition
    for(let i=0; i<passwordLength- functArr.length; i++)
    {
        let randIndex = getRandomInt(0,functArr.length);
        password += functArr[randIndex]();
    }

    // shuffling the elements of password
    password = shufflepassword(Array.from(password));

    // show in UI
    passwordDisplay.value = password;

    // calculate strength
    calcStrenght();


})


