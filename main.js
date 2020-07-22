"use strict";
// const clockTitle = document.querySelector(".time");

// function getTime() {
//   const date = new Date();
//   const minutes = date.getMinutes();
//   const hours = date.getHours();
//   const seconds = date.getSeconds();

//   /*삼항 연산자를 통해 01,02 ~ 09까지  처리*/
//   clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
//     minutes < 10 ? `0${minutes}` : minutes
//   }:${seconds < 10 ? `0${seconds}` : seconds}`;
// }

// function init() {
//   getTime();
//   setInterval(getTime, 1000);
// }

// init();

const btn = document.querySelector(".play__btn");
const time = document.querySelector(".time");
const count = document.querySelector(".count");
const carrot = document.querySelectorAll(".carrot");
const countset = 10;
btn.addEventListener("click", () => {
  count.innerHTML = countset;
});

carrot.addEventListener;
