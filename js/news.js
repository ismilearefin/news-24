const newsCategories = () =>{
  
  fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(catagories => catagoriesName(catagories.data.news_category))
    .catch(error => console.log(error))
}

const catagoriesName = names =>{

  for(const name of names){
    // console.log(name.category_name)
    const mainDiv_cat = document.getElementById('cat_mainDiv');
    const newDiv_cat = document.createElement('div');
    newDiv_cat.setAttribute("class", "d-flex","justify-content-evenly", "my-4");
    newDiv_cat.innerHTML =`
        <a href='#' onclick="catagorieslink('${name.category_id}')" class="btn">${name.category_name}</a>
    `
    mainDiv_cat.appendChild(newDiv_cat);
  }
}




const catagorieslink = x =>{
  spinner(true) ;
  const url = `https://openapi.programming-hero.com/api/news/category/${x}`
  fetch(url)
  .then(res => res.json())
  .then(data => newsShow(data.data))
  .catch(error => console.log(error))
}




const newsShow = news =>{
  // console.log(news.length);
    
    const cardDiv = document.getElementById('cardDiv');
    cardDiv.innerText = '';

    if((news.length) !== 0){
        const lengthDiv = document.getElementById('length');
        lengthDiv.innerText = '';
        const divs = document.createElement('h5')
        divs.innerHTML = `${news.length} news here`
        lengthDiv.appendChild(divs);
      for(const data of news){
        
        // console.log(data)
        const newCardDiv = document.createElement('div');
        newCardDiv.setAttribute("class", "container");
        newCardDiv.innerHTML= `
        <div class="container"  > 
              <div class="card mb-3 w-100 shadow "> 
                <div class="row g-0"> 
                <div class="col-md-3 p-4">
                  <img src="${data?.thumbnail_url}" class="img-fluid rounded" alt="...">
                </div>
                <div class="col-md-9">
                  <div class="card-body px-4 pt-4 h-75 overflow-hidden short">
                    <h5 class="card-title h4">${data?.title ? data.title : 'no data'}</h5>
                    <p class="card-text ">${data?.details ? data.details : 'no data'}</p>
                  </div>
                  <div class="d-flex justify-content-between px-4  ">
                    <div class="d-flex align-self-center ">
                      <img style="border-radius: 100%; width: 40px;" src="${data?.author.img}" alt="">
                      <p class="mx-3 mt-3 ">${data?.author.name ? data.author.name : 'no data'}</p>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="fa-solid fa-eye"> ${data?.total_view ? data.total_view : 'no data'}</i>
                    </div>
                    <div class="d-flex align-items-center">
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-solid fa-star"></i>
                      <i class="fa-regular fa-star"></i>
                    </div>
                    <div class="d-flex align-items-center">
                    
                    <button type="button" onclick="newsdetail('${data?._id}')"     class="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    View
                    </button>
                    </div>
                  </div>
                </div>
                </div> 
              </div> 
          </div>
        `
        cardDiv.appendChild(newCardDiv);
        }
      }else{
        const lengthDiv = document.getElementById('length');
        lengthDiv.innerText = '';
        const divs = document.createElement('h5')
        divs.innerHTML = ` No data found`
        lengthDiv.appendChild(divs);

        const newTextDiv = document.createElement('div');
        newTextDiv.setAttribute("class", "text-center", "mt-4");
        newTextDiv.innerHTML =`
        <h1 class="text-muted">NO News Found</h1>
        `
        cardDiv.appendChild(newTextDiv);
      }
      spinner(false) ;
  }

//  modal js ............

  const newsdetail = newsData =>{
    
    const url = `https://openapi.programming-hero.com/api/news/${newsData}`
    // console.log(url)
    fetch(url)
      .then(res => res.json())
      .then(news => modal(news.data))
      .catch(error => console.log(error))
  }


const modal = (maindata) =>{
  
  
  
  
  for(const data of maindata){
    // console.log(data)
    // modalsec.innerHTML = '';
    // const newdiv = document.createElement('div')
    const  modalsec = document.getElementById('modal');
  modalsec.innerHTML = `
                <img src="${data?.image_url }" class="img-fluid rounded" alt="">
                <h5 class="card-title h4">${data?.title ? data.title : 'no data'}</h5>
                <p class="card-text ">${data?.details ? data.details : 'no data'}</p>
                <p>Rating : ${data?.rating?.number ? data.rating.number : 'no data'}</p>
                <h5 class="modal-title" id="staticBackdropLabel"> Total View :${data?.total_view ? data.total_view :'no data'}</h5>
  `
  // modalsec.appendChild(newdiv);
  }
}

// spinner function here ..............
const spinner = isloading =>{
  const spinner = document.getElementById('spinner');
  if(isloading){
    spinner.classList.remove('d-none');
  }else{
    spinner.classList.add('d-none');
  }
}




newsCategories();







