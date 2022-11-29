//9f1afa81f71768bd20d99d09093a2970
const searchNews=document.getElementById('searchBar');
function f(){

fetch('https://gnews.io/api/v4/top-headlines?country=in&lang=en&token=9f1afa81f71768bd20d99d09093a2970')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data.hasOwnProperty('errors'));
        console.log(data);
    });
}

let news={
    // apiKey:'ec3c16c75f5510694ad684341642a8df',
    apiKey:'9f1afa81f71768bd20d99d09093a2970',
    fetchNews:function(search){
        fetch(`https://gnews.io/api/v4/search?q=${search}&token=9f1afa81f71768bd20d99d09093a2970&lang=en`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            news.getNewsData(data);
        }); 
    },
    getNewsData:function(data){
        let {articles}=data;
        articles.forEach(element => {
            news.createNewsCardToDom(element);
        });
        let newsContant=document.getElementById('newsContant');
             newsContant.classList.remove('hide');
        let header=document.getElementById('header');
            header.classList.add('hide');
        let searchBar=document.getElementById('searchBar');
            searchBar.value="";
            

    },
    createNewsCardToDom:function(data){
        let {
            title,
            description,
            url,
            image,
            publishedAt,
            source
        }=data;
        let newsContant=document.getElementById('newsContant');
        let divCard=document.createElement('div');
            divCard.classList.add('newsCard');
            let divImg=document.createElement('div');
                divImg.classList.add('img');
                let imgNews=document.createElement('img');
                    imgNews.classList.add('newsImg');
                    imgNews.src=image;
                divImg.append(imgNews);
            let divInfo=document.createElement('div');
                divInfo.classList.add('info');

                let dateAndTimeDiv=document.createElement('div');
                    dateAndTimeDiv.classList.add('dateAndTime');        
                    let pDate=document.createElement('p');
                        var date = new Date(publishedAt);
                        // pDate.innerText=publishedAt;
                        pDate.innerText= date.toLocaleString();
                    dateAndTimeDiv.append(pDate);    
                let titleDiv=document.createElement('div');
                    titleDiv.classList.add('title');        
                    let pTitle=document.createElement('p');
                        pTitle.innerText=title;
                    titleDiv.append(pTitle);    
                let descDiv=document.createElement('div');
                    descDiv.classList.add('desc');        
                    let pDesc=document.createElement('p');
                        pDesc.innerText=description;
                    descDiv.append(pDesc);    
                let sourceDiv=document.createElement('div');
                    sourceDiv.classList.add('source');
                    let sourceItemDiv=document.createElement('div');       
                        sourceItemDiv.classList.add('sourceItem'); 
                        let h4Source=document.createElement('h4');
                            h4Source.innerText='Source:';          
                        let pSource=document.createElement('p');
                            pSource.innerText=source.name;
                        sourceItemDiv.append(h4Source);
                        sourceItemDiv.append(pSource);
                    sourceDiv.append(sourceItemDiv);                         
            
            divInfo.append(dateAndTimeDiv);
            divInfo.append(titleDiv);
            divInfo.append(descDiv);
            divInfo.append(sourceDiv);
            
            let btnNewsMoreDiv=document.createElement("div");
                btnNewsMoreDiv.classList.add('btnNewsMore');
                let btnMore=document.createElement('button');
                    btnMore.innerText="Know More...";
                    btnMore.style.fontWeight = "bold";
                    btnMore.style.color="blue";
                    btnMore.style.cursor="pointer";
                    btnMore.addEventListener('click',()=>{
                        window.location.href=`${url}`;
                    });
                btnNewsMoreDiv.append(btnMore);    
        divCard.append(divImg);          
        divCard.append(divInfo);            
        divCard.append(btnNewsMoreDiv);              

        newsContant.append(divCard);    
    }
};
searchNews.addEventListener('keyup',(e)=>{
    let searchValue=e.target.value;
   if(e.key==='Enter')
   {
       news.fetchNews(searchValue,e.target.value);

   }
   
});    