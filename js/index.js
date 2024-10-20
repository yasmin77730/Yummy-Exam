///<reference types="../@types/jquery"/>



$('.bar').on('click', function(){
    $('.sideBar').css('left',0)
   

})

$('.xmark').on('click', function(){
    $('.sideBar').css('left','-270px')
   
    
})

// get data for first page
let allData=[];
async function getData() {
  try{
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let finalData=await data.json();
    
    allData=finalData.meals;
    console.log(allData);
    displayData(allData);
  }catch(error){
    console.log(error);
  }
}


function displayData(array){
    let cartouna='';
    for(let i=0;i<array.length;i++){
        cartouna+=`<div class="col-md-3 meal">
       <div class="meal rounded mt-5 position-relative overflow-hidden">
        <img src="${array[i].strMealThumb}" class="w-100 rounded" alt="">
        <div class="cover ">
          <h3>${array[i].strMeal}</h3>
        </div>
       </div>
      </div>`
    }
if(document.getElementById('demo'))  document.getElementById('demo').innerHTML=cartouna;

let categoryList=document.querySelectorAll('.meal');
for (let i= 0; i < categoryList.length; i++) {
  categoryList[i].addEventListener('click',function(){
    localStorage.setItem("productName",categoryList[i].innerText)
    location.href="./productDetails.html"
  })
    
}
}
getData()
// end of first page 
// start of mealsDetails
let allProductsDetails=[];

async function getDatadetails(index) {
  try{
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${index}`);
    let finalData=await data.json();
    
    allProductsDetails=finalData.meals
    console.log(allProductsDetails);
    displayProductDetails(allProductsDetails);
  }catch(error){
    console.log(error);
  }
}

if(location.pathname=="/productDetails.html"){
    getDatadetails(localStorage.getItem('productName'))
}




function displayProductDetails(array){
    let cartouna='';
    for(let i=0;i<array.length;i++){
        cartouna+=` <div class="productInfo col-md-4 ">
                <div class="productImage p-5">
                 <img src="${array[i].strMealThumb}"" class="w-100 rounded-3 " alt="">
                </div>
                <h1 class="p-5">${array[i].strMeal}</h1>
             </div>
             <div class="productInfo2 d-flex flex-column py-5 col-md-8">
                 <h2 >Instructions</h2>
                 <p>${array[i].strInstructions}"</p>
 <h3>Area :${array[i].strArea}</h3>
 <h3>Category : ${array[i].strCategory}</h3>
 <h3>Recipes :</h3>
 <ul class=" list-unstyled d-flex g-3 flex-wrap">
     <li class="alert alert-info m-2 p-1">${array[i].strIngredient1}</li>
     <li class="alert alert-info m-2 p-1">${array[i].strIngredient2}</li>
     <li class="alert alert-info m-2 p-1">${array[i].strIngredient3}</li>
     <li class="alert alert-info m-2 p-1">${array[i].strIngredient4}</li>
     <li class="alert alert-info m-2 p-1">${array[i].strIngredient5}</li>
     <li class="alert alert-info m-2 p-1">${array[i].strIngredient6}</li>
     <li class="alert alert-info m-2 p-1"> ${array[i].strIngredient7}</li>
   </ul>
   <h3>Tags :</h3>
   <div class="btns d-flex">
     <button class="btn btn-success me-2"><a href="" class="text-decoration-none text-white">Source</a> </button>
     <button class="btn btn-danger">Youtube</button>
   </div>
 
 
             </div>`
    }
if(document.getElementById('Details'))  document.getElementById('Details').innerHTML=cartouna;
 
}



// searchPage
let searchBtn1 = document.getElementById('searchByName');
let searchBtn2 = document.getElementById('searchByFirstLetter');

// search input by name
let allData2=[];
async function getDataSearch(id) {
  try{
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`);
    console.log(id)
    let finalData=await data.json();
    allData2=finalData.meals
    console.log(allData2 +'hhhhh');
    displayDataSearch();
  }catch(error){
    console.log(error);
  }
}


function displayDataSearch() {
  let cartouna = '';
  if (allData2 && allData2.length > 0) {
    for (let i = 0; i < allData2.length; i++) {
      cartouna += `<div class="col-md-3 category">
                     <div class="meal rounded mt-5 position-relative overflow-hidden">
                       <img src="${allData2[i].strMealThumb}" class="w-100 rounded" alt="">
                       <div class="cover">
                         <h3>${allData2[i].strMeal}</h3>
                       </div>
                     </div>
                   </div>`;
    }
  } else {
    cartouna = '<p>No meals found. Please try another search.</p>';
  }
  document.getElementById('demo2').innerHTML = cartouna;
}


searchBtn1?.addEventListener('input', function () {
  getDataSearch(searchBtn1.value); 
  });



  
// search input first letter
  let allData3=[];
async function getDataSearch2(id) {
  try{
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${id}`);
    console.log(id)
    let finalData=await data.json();
    allData3=finalData.meals
    console.log(allData3 +'hhhhh');
    displayDataSearch2();
  }catch(error){
    console.log(error);
  }
}


function displayDataSearch2(){
    let cartouna='';
    for(let i=0;i<allData3.length;i++){
        cartouna+=`<div class="col-md-3 category">
       <div class="meal rounded mt-5 position-relative overflow-hidden">
        <img src="${allData3[i].strMealThumb}" class="w-100 rounded" alt="">
        <div class="cover ">
          <h3>${allData3[i].strMeal}</h3>
        </div>
       </div>
      </div>`
     
    }
 document.getElementById('demo2').innerHTML=cartouna;
}

  searchBtn2?.addEventListener('input', function () {
    getDataSearch2(searchBtn2.value); 
  });

// categories page
let allcategories = [];

async function getCategory() {
  try {
    let Data = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    let res = await Data.json();
    
    if (res.categories && res.categories.length > 0) {
      allcategories = res.categories;
      displayCategory();
    } else {
      console.log("No categories found.");
    }
  } catch (error) {
    console.log("Error fetching categories: " + error);
  }
}

if(location.pathname=="/categories.html"){
  getCategory();
}



function displayCategory() {
  let cartona = '';
  if (allcategories.length > 0) {
    for (let i = 0; i < allcategories.length; i++) {
      cartona += `
        <div class="col-md-3 categories">
          <div class="meal rounded mt-5 position-relative overflow-hidden">
            <img src="${allcategories[i].strCategoryThumb}" class="w-100 rounded" alt="${allcategories[i].strCategory}">
            <div class="cover d-flex flex-column">
              <h3 class="caption">${allcategories[i].strCategory}</h3>
            </div>
          </div>
        </div>`;
    }
  } else {
    cartona = '<p>No categories found.</p>';  // Display a message if no data is found
  }
  if(document.getElementById('demo4')) document.getElementById('demo4').innerHTML=cartona;
  let catCard=document.querySelectorAll('.categories');
  
  console.log(catCard)
  for (let i = 0; i < catCard.length; i++) {
    catCard[i].addEventListener('click', function() {
      let Text = catCard[i].innerText;
      console.log(Text);
      localStorage.setItem('catProduct', Text);
      location.href="./categoryProducts.html"

    
    })
  }
}
 
let mealsByCat=[];
async function getMealByCategory(id) {
  try {
    let Data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`);
    let res = await Data.json();
    
    if (res.meals && res.meals.length > 0) {
      mealsByCat = res.meals.slice(0, 20);
     console.log(mealsByCat);
     displayMeals()
    } else {
      console.log("No categories found.");
    }
  } catch (error) {
    console.log("Error fetching categories: " + error);
  }
}

if(location.pathname=="/categoryProducts.html"){
  getMealByCategory(localStorage.getItem('catProduct'))
}

function displayMeals(){
  let cartouna='';
  for (let index = 0; index < mealsByCat.length; index++) {
   cartouna+=` <div class="col-md-3 cattmeals ">
            <div class="meal rounded mt-5 position-relative overflow-hidden">
             <img src="${mealsByCat[index].strMealThumb}" class="w-100 rounded" alt="">
            <div class="cover d-flex flex-column">
               <h3 class="caption">${mealsByCat[index].strMeal}</h3>
             
           </div>
            </div>     
            </div>`
    
  }
  if(document.getElementById('demo5')) document.getElementById('demo5').innerHTML=cartouna;
  let mealCards=document.querySelectorAll(".cattmeals");
  for (let index = 0; index < mealCards.length; index++) {
    mealCards[index]?.addEventListener('click',function(){
      localStorage.setItem('mealId',mealCards[index].innerText);
      location.href="./mealDetails.html"
    })
    
  }

}
// display mealDetails
let allMealsDetails=[];
async function getMealDetails(id) {

  try{
    let data= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let finalData=await data.json();
    
    allMealsDetails=finalData.meals;
    displayMealsDetails()
    console.log(allMealsDetails);
   
  }catch(error){
    console.log(error);
  }
}

if(location.pathname=="/mealDetails.html"){
  getMealDetails(localStorage.getItem('mealId'))
}



// display function
function displayMealsDetails(){
  let cartouna='';
  for(let i=0;i<allMealsDetails.length;i++){
      cartouna+=` <div class="productInfo col-md-4 ">
              <div class="productImage p-5">
               <img src="${allMealsDetails[i].strMealThumb}"" class="w-100 rounded-3 " alt="">
              </div>
              <h1 class="p-5">${allMealsDetails[i].strMeal}</h1>
           </div>
           <div class="productInfo2 d-flex flex-column py-5 col-md-8">
               <h2 >Instructions</h2>
               <p>${allMealsDetails[i].strInstructions}"</p>
<h3>Area :${allMealsDetails[i].strArea}</h3>
<h3>Category : ${allMealsDetails[i].strCategory}</h3>
<h3>Recipes :</h3>
<ul class=" list-unstyled d-flex g-3 flex-wrap">
   <li class="alert alert-info m-2 p-1">${allMealsDetails[i].strIngredient1}</li>
   <li class="alert alert-info m-2 p-1">${allMealsDetails[i].strIngredient2}</li>
   <li class="alert alert-info m-2 p-1">${allMealsDetails[i].strIngredient3}</li>
   <li class="alert alert-info m-2 p-1">${allMealsDetails[i].strIngredient4}</li>
   <li class="alert alert-info m-2 p-1">${allMealsDetails[i].strIngredient5}</li>
   <li class="alert alert-info m-2 p-1">${allMealsDetails[i].strIngredient6}</li>
   <li class="alert alert-info m-2 p-1"> ${allMealsDetails[i].strIngredient7}</li>
 </ul>
 <h3>Tags :</h3>
 <div class="btns d-flex">
   <button class="btn btn-success me-2"><a href="" class="text-decoration-none text-white">Source</a> </button>
   <button class="btn btn-danger">Youtube</button>
 </div>


           </div>`
  }
if(document.getElementById('MealDetails'))  document.getElementById('MealDetails').innerHTML=cartouna;

}

// area page

let allAreas = [];

async function getArea() {
  try {
    let Data = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    let res = await Data.json();
    allAreas = res.meals;  // Store the array of categories

    console.log(allAreas); 
    displayArea()
  } catch (error) {
    console.log(error + ' is error');
  }
}

if(location.pathname=="/area.html"){
  getArea();
}




function displayArea(){
  let cartounaa='';
  for (let index = 0; index < allAreas.length; index++) {
    cartounaa+=`<div class="col-md-3 d-flex flex-column areaCard">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${allAreas[index].strArea}</h3>
            </div>`
    
  }
  if(document.getElementById('Area')) document.getElementById('Area').innerHTML=cartounaa;
  let allAreaCard=document.querySelectorAll('.areaCard');

  for (let i = 0; i < allAreaCard.length; i++) {
    allAreaCard[i].addEventListener('click', function() {
      let Text = allAreaCard[i].innerText;
      localStorage.setItem('AreaMeal', Text);
      location.href="./areaMeals.html"

    
    })
  }

}
// display area meals
let allAreaMeals=[];

async function getAreaMeals(id) {
  try {
    let Data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`);
    let res = await Data.json();
    allAreaMeals = res.meals;  // Store the array of categories
    console.log(allAreaMeals); 
    displayAreaMeals()
  } catch (error) {
    console.log(error + ' is error');
  }
}


if(location.pathname=="/areaMeals.html"){
  getAreaMeals(localStorage.getItem('AreaMeal'))
}

function displayAreaMeals(){
let cartona='';
for (let index = 0; index < allAreaMeals.length; index++) {
  cartona+=`<div class="col-md-3  id="${allAreaMeals[index].idMeal}">
            <div class="meal rounded mt-5 position-relative overflow-hidden">
             <img src="${allAreaMeals[index].strMealThumb}" class="w-100 rounded" alt="">
            <div class="cover d-flex flex-column">
               <h3 class="caption">${allAreaMeals[index].strMeal}</h3>
             
           </div>
            </div>     
            </div>`
 
  
}
if(document.getElementById('Areameals')) document.getElementById('Areameals').innerHTML=cartona;
}

// ingredient page

let allIngredients = [];

// Fetch the ingredients from the API
async function getIngredients() {
  try {
    let Data = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    let res = await Data.json();
    allIngredients = res.meals.slice(0, 20);  // Limit to 20 ingredients

    console.log(allIngredients);  // Check the fetched data
    displayIngredients(allIngredients);  // Pass the array to display function
  } catch (error) {
    console.log(error + ' is error');
  }
}


function displayIngredients(){
  let cartounaa='';
  for (let index = 0; index < allIngredients.length; index++) {
    cartounaa+=`  <div class="ingcard col-md-3 d-flex flex-column justify-content-center align-items-center" >
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3>${allIngredients[index].strIngredient}</h3>
            <p>${allIngredients[index].strDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>`
    
  }
  if(document.getElementById('ingredients')) document.getElementById('ingredients').innerHTML=cartounaa;
let allIngCards=document.querySelectorAll('.ingcard');
for (let index = 0; index < allIngCards.length; index++) {
allIngCards[index].addEventListener('click',function(){
  location.href="./ingredientMeal.html"
  localStorage.setItem('ingId',allIngredients[index].strIngredient);
})
  
}


}

if(location.pathname=="/ingredients.html"){
  getIngredients();
}

// ingredients meals page



let allIngMeals=[];

async function getIngMeals(id) {
  try {
    let Data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${id}`);
    let res = await Data.json();
    allIngMeals = res.meals;  // Store the array of categories
    console.log(allIngMeals); 
    displayIngMeals()
  } catch (error) {
    console.log(error + ' is error');
  }
}


if(location.pathname=="/ingredientMeal.html"){
  getIngMeals(localStorage.getItem('ingId'))
}

function displayIngMeals(){
let cartona='';
for (let index = 0; index < allIngMeals.length; index++) {
  cartona+=`<div class="col-md-3  id="${allIngMeals[index].idMeal}">
            <div class="meal rounded mt-5 position-relative overflow-hidden">
             <img src="${allIngMeals[index].strMealThumb}" class="w-100 rounded" alt="">
            <div class="cover d-flex flex-column">
               <h3 class="caption">${allIngMeals[index].strMeal}</h3>
             
           </div>
            </div>     
            </div>`
 
  
}
if(document.getElementById('IngredientsMeal')) document.getElementById('IngredientsMeal').innerHTML=cartona;
}







// contact us page
function validateForm() {
  
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;
  const phone = document.getElementById('phoneInput').value;
  const age = document.getElementById('ageInput').value;
  const password = document.getElementById('passwordInput').value;
  const repassword = document.getElementById('repasswordInput').value;

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError');
  const ageError = document.getElementById('ageError');
  const passwordError = document.getElementById('passwordError');
  const repasswordError = document.getElementById('repasswordError');

  // Regular expressions
  const nameRegex = /^[A-Za-z\s]{3,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9]{10}$/;
  const ageRegex = /^(1[89]|[2-9][0-9])$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  let valid = true;

  // Clear previous error messages
  nameError.textContent = '';
  emailError.textContent = '';
  phoneError.textContent = '';
  ageError.textContent = '';
  passwordError.textContent = '';
  repasswordError.textContent = '';

  
  if (!nameRegex.test(name)) {
      nameError.textContent = "Please enter a valid name (minimum 3 letters).";
      valid = false;
  }
  if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email.";
      valid = false;
  }
  if (!phoneRegex.test(phone)) {
      phoneError.textContent = "Please enter a valid phone number (10 digits).";
      valid = false;
  }
  if (!ageRegex.test(age)) {
      ageError.textContent = "Please enter a valid age (18-99).";
      valid = false;
  }
  if (!passwordRegex.test(password)) {
      passwordError.textContent = "Password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, and 1 number.";
      valid = false;
  }
  if (password !== repassword) {
      repasswordError.textContent = "Passwords do not match.";
      valid = false;
  }

  // If all validations pass, display success
  if (valid) {
      alert("Form submitted successfully!");
     clearForm();

  }

  
}
function clearForm() {
  document.getElementById('nameInput').value = '';
  document.getElementById('emailInput').value = '';
  document.getElementById('phoneInput').value = '';
  document.getElementById('ageInput').value = '';
  document.getElementById('passwordInput').value = '';
  document.getElementById('repasswordInput').value = '';
}









