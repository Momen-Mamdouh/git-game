"use strict";

export class Details{

        constructor(userSelectedId){
            this.detailsSection = document.querySelector('.details-section');
            this.navBar = document.querySelector('.navbar-section');
            this.loading = document.querySelector(".loading");
            // **We get user Id from Ui_js file by clicking event.
            this.getApigameDetails(userSelectedId)
        }   



        async getApigameDetails(id){
            // ** Display loading until api is called, has id parameter that define which game card details we'll call by api.
            // *Gives response to fn:toggleSelectedGameCardDetails to display Game Details from returned Api Data.
            this.loading.classList.replace("d-none","d-flex");
            const apiUrl = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
            const apiData = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': '428a1dcf65msh049145653d66d76p144cf6jsne46ddf36fab8',
                        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
                    }
                };
            const api = await fetch(apiUrl, apiData);
            const response = await api.json();
            
            this.toggleSelectedGameCardDetails(response);
            this.loading.classList.replace("d-flex","d-none");   
           
            
    }


    toggleSelectedGameCardDetails(selectedGameDetailsResponse){
        // **Display Data from returned Object of selected card which is defined by it's id detected from clicking Event in Ui-JsFile
        let detailsResponseData = ` 

                <div class="conatiner ">

                    <header class=" text-white mx-5 p-4 d-flex justify-content-between details-header">
                        <h1 class="game-details-heading">Game Details</h1>
                        <button class="btn-close btn-close-white closing-details-section-btn"> </button>
                    </header>

                    <div class=" details-content row  mx-5 text-white ">
                        <div class="col-md-4 game-image mx-2">
                            <figure class="game-details-image">
                                <img src=${selectedGameDetailsResponse.thumbnail} class="w-100 rounded-2" alt="${selectedGameDetailsResponse.title} Game Image">
                            </figure>
                        </div>

                        <div class="col-md-7 game-content ">
                            <figcaption class="game-details-content">
                                <h3 class="game-title">Title: ${selectedGameDetailsResponse.title}</h3>
                                <p class="game-category">${selectedGameDetailsResponse.genre} <span class="badge text-bg-info"> MMORPG</span> </p>
                                <p class="game-paltform">${selectedGameDetailsResponse.platform} <span class="badge text-bg-info"> Windows</span> </p>
                                <p class="game-status">${selectedGameDetailsResponse.status} <span class="badge text-bg-info"> Live</span> </p>
                                <p class="small game-details-paragrpah">${selectedGameDetailsResponse.description}</p>
                            </figcaption>
                            <a class="btn btn-outline-warning" target="_blank" href=${selectedGameDetailsResponse.freetogame_profile_url}>Show Game</a>
                        </div>
                    </div>

                </div>

            `     
         
        this.detailsSection.innerHTML = detailsResponseData;
        this.detailsSection.classList.replace("d-none", "d-flex");
        this.navBar.classList.replace("position-sticky", "position-static");
        document.querySelector('.closing-details-section-btn').addEventListener("click",()=>{
            this.detailsSection.classList.replace('d-flex', 'd-none');
            this.navBar.classList.replace("position-static", "position-sticky");
            
        });
        

    }

}













   // getSelecetedUserGameCardId(){
    //     let selectedGameCardId;
    //     document.querySelectorAll(".gameData .card").forEach((link) => {
    //         link.addEventListener("click", (e) => {
    //             selectedGameCardId = link.id ;             
    //     })});
    //     return selectedGameCardId;
    // }
