"use strict";
import {Details} from "./details.js"
export class Ui{

    constructor(){
        this.navBar = document.querySelector('.navbar-nav');
        this.currentCategory  = document.querySelector('.navbar-nav .nav-link.active');
        this.dataDisplayedSection = document.querySelector('.gameData');
        this.loading = document.querySelector(".loading");
         
        this.getUserSelectedCategoryGames();
        
    }


    
    getUserSelectedCategoryGames(){
        // **Function to detect which anchor is active now after clicking and give it as an argument.
        // ** to be called (by it's name) as category to the api.
        this.getApiCategories(this.currentCategory.textContent);
        // this.navBar.addEventListener('click',(e)=>{
        //     const selectedSection =  e.target;
        //     const oldCategory = document.querySelector('.navbar-nav .nav-link.active');

        //     oldCategory.classList.remove('active');
        //     selectedSection.classList.add('active');
        //     let userCategory = document.querySelector('.navbar-nav .nav-link.active').textContent;
            
        //     this.getApiCategories(userCategory);
        // })
        document.querySelectorAll(".navbar-nav a").forEach((link) => {
            link.addEventListener("click", (e) => {
               document.querySelector(".navbar-nav .active").classList.remove("active");
               e.target.classList.add("active");
               this.getApiCategories(e.target.textContent);
        })});

    };

    async getApiCategories(category){
        // ** Display loading until api is called, has category parameter that define which category we call by api.
        // **This category come by fn:getUserSelectedCategoryGames.
        // **Also give it's response as a argument to fn:displayResponseData to dispaly data returned from Api.
        this.loading.classList.remove("d-none");
        const apiUrl = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
        const apiData = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '428a1dcf65msh049145653d66d76p144cf6jsne46ddf36fab8',
                    'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                        }
                    };
        const api = await fetch(apiUrl, apiData);
        const response = await api.json();
        this.displayResponseData(response);
        this.loading.classList.add("d-none");


        
}

        displayResponseData(resposeArrayData){
            // **Display data returned from response by for loop and innerHtml in targeted element.
            let responeDataToDisplay = ``;
                       
            for (let i = 0; i < resposeArrayData.length; i++){
                responeDataToDisplay += ` 
                    <div class="col-md-3 pb-4 card-data  ">
                        <div id="${resposeArrayData[i].id}" class="card   bg-transparent  text-white" role="button">

                            <div class="card-body ">
                                <figure>
                                    <img src=${resposeArrayData[i].thumbnail} class="card-img-top card-img" alt="${resposeArrayData[i].title} Game Image">
                                </figure>

                                <figcaption>
                                    <div class="card-caption d-flex justify-content-between align-items-center">
                                        <h3 class="card-title small game-name">${resposeArrayData[i].title}</h3>
                                        <span class="badge  text-bg-primary p-2 game-state">Free</span>
                                    </div>
                                    <p class="card-text small text-center opacity-50 game-details">
                                        ${resposeArrayData[i].short_description}
                                    </p>
                                </figcaption>

                            </div>

                            <footer class="d-flex small hstack  justify-content-between">
                                <span class="badge badge-color m-2   rounded-5  game-">r${resposeArrayData[i].genre}</span>
                                <span class="badge badge-color m-2  rounded-5 game-os">${resposeArrayData[i].platform}</span>
                            </footer>
                        </div>
                    </div>

                `     
            }           
            this.dataDisplayedSection.innerHTML = responeDataToDisplay;

            document.querySelectorAll(".gameData .card").forEach((link) => {
                link.addEventListener("click", (e) => {
                    // **This clicking Event for detecting which card is selected and get it's id To give it to Details-Js-File.
                    let selectedGameCardId = link.id ;    
                    const detailDisplay = new Details(selectedGameCardId);

            })});

        }
   
}