const countryList = {
  AED: "AE",
  AFN: "AF",
  XCD: "AG",
  ALL: "AL",
  AMD: "AM",
  ANG: "AN",
  AOA: "AO",
  AQD: "AQ",
  ARS: "AR",
  AUD: "AU",
  AZN: "AZ",
  BAM: "BA",
  BBD: "BB",
  BDT: "BD",
  XOF: "BE",
  BGN: "BG",
  BHD: "BH",
  BIF: "BI",
  BMD: "BM",
  BND: "BN",
  BOB: "BO",
  BRL: "BR",
  BSD: "BS",
  NOK: "BV",
  BWP: "BW",
  BYR: "BY",
  BZD: "BZ",
  CAD: "CA",
  CDF: "CD",
  XAF: "CF",
  CHF: "CH",
  CLP: "CL",
  CNY: "CN",
  COP: "CO",
  CRC: "CR",
  CUP: "CU",
  CVE: "CV",
  CYP: "CY",
  CZK: "CZ",
  DJF: "DJ",
  DKK: "DK",
  DOP: "DO",
  DZD: "DZ",
  ECS: "EC",
  EEK: "EE",
  EGP: "EG",
  ETB: "ET",
  EUR: "FR",
  FJD: "FJ",
  FKP: "FK",
  GBP: "GB",
  GEL: "GE",
  GGP: "GG",
  GHS: "GH",
  GIP: "GI",
  GMD: "GM",
  GNF: "GN",
  GTQ: "GT",
  GYD: "GY",
  HKD: "HK",
  HNL: "HN",
  HRK: "HR",
  HTG: "HT",
  HUF: "HU",
  IDR: "ID",
  ILS: "IL",
  INR: "IN",
  IQD: "IQ",
  IRR: "IR",
  ISK: "IS",
  JMD: "JM",
  JOD: "JO",
  JPY: "JP",
  KES: "KE",
  KGS: "KG",
  KHR: "KH",
  KMF: "KM",
  KPW: "KP",
  KRW: "KR",
  KWD: "KW",
  KYD: "KY",
  KZT: "KZ",
  LAK: "LA",
  LBP: "LB",
  LKR: "LK",
  LRD: "LR",
  LSL: "LS",
  LTL: "LT",
  LVL: "LV",
  LYD: "LY",
  MAD: "MA",
  MDL: "MD",
  MGA: "MG",
  MKD: "MK",
  MMK: "MM",
  MNT: "MN",
  MOP: "MO",
  MRO: "MR",
  MTL: "MT",
  MUR: "MU",
  MVR: "MV",
  MWK: "MW",
  MXN: "MX",
  MYR: "MY",
  MZN: "MZ",
  NAD: "NA",
  XPF: "NC",
  NGN: "NG",
  NIO: "NI",
  NPR: "NP",
  NZD: "NZ",
  OMR: "OM",
  PAB: "PA",
  PEN: "PE",
  PGK: "PG",
  PHP: "PH",
  PKR: "PK",
  PLN: "PL",
  PYG: "PY",
  QAR: "QA",
  RON: "RO",
  RSD: "RS",
  RUB: "RU",
  RWF: "RW",
  SAR: "SA",
  SBD: "SB",
  SCR: "SC",
  SDG: "SD",
  SEK: "SE",
  SGD: "SG",
  SKK: "SK",
  SLL: "SL",
  SOS: "SO",
  SRD: "SR",
  STD: "ST",
  SVC: "SV",
  SYP: "SY",
  SZL: "SZ",
  THB: "TH",
  TJS: "TJ",
  TMT: "TM",
  TND: "TN",
  TOP: "TO",
  TRY: "TR",
  TTD: "TT",
  TWD: "TW",
  TZS: "TZ",
  UAH: "UA",
  UGX: "UG",
  USD: "US",
  UYU: "UY",
  UZS: "UZ",
  VEF: "VE",
  VND: "VN",
  VUV: "VU",
  YER: "YE",
  ZAR: "ZA",
  ZMK: "ZM",
  ZWD: "ZW",
};

const base_url = "https://open.er-api.com/v6/latest/USD";

const dropDowns = document.querySelectorAll(".dropDown select");
const btn = document.querySelector("form button");
const FromCurr = document.querySelector(".from select");
const ToCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropDowns) {
  for(let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name === "From" && currCode === "USD") {
      newOption.selected = "selected";
    } else if(select.name === "To" && currCode === "INR") {
      newOption.selected = "selected";
    } 
    select.append(newOption);
}

 select.addEventListener("change", (evt) => {
  updateFlag(evt.target);
 })
}

const updateFlag = (element) => {
  let currCode = element.value;
  countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  btn.style.opacity = 0.5;
  setTimeout(function() {
        btn.style.opacity = "1"; 
    }, 200);

  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if(amtVal === "" || amtVal < 0) {
      amtVal = 1;
      amount.value = "1";
  }
  let response  = await fetch(base_url);
  let data = await response.json(); 
  let finalAmount = amtVal * (data.rates[ToCurr.value] / data.rates[FromCurr.value]);
  msg.innerText = `${amtVal} ${FromCurr.value} = ${finalAmount} ${ToCurr.value}`

  if (!data.rates[FromCurr.value] || !data.rates[ToCurr.value]) {
    msg.innerText = "Currency not supported!";
    return;
  }
});

let modeBtn = document.querySelector(".Mode");
let container = document.querySelector(".container");
let currMode = "light";

modeBtn.addEventListener("click", () => {
    if(currMode === "light") {
        currMode = "dark";
        modeBtn.style.backgroundColor = "#fff"
        modeBtn.style.color = "black";
        modeBtn.innerText = "Light Mode"
        container.style.backgroundColor = "black";
        container.style.color = "white";
    } else{
        currMode = "light";
        modeBtn.style.backgroundColor = "black"
        modeBtn.style.color = "#fff";
        modeBtn.innerText = "Dark Mode"
        container.style.backgroundColor = "#fff";
        container.style.color = "black";
    }

    console.log(currMode);
})

