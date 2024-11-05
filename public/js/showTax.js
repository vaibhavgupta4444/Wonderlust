let showTax=document.querySelector("#flexSwitchCheckDefault");
let taxLabel=document.querySelector("#taxLabel");
let taxWithGst=document.querySelectorAll(".taxWithGst");
let originalTax=document.querySelectorAll(".originalTax");

showTax.addEventListener("click",()=>{
    if(showTax.checked){
        taxLabel.innerText="Display total after tax";
        for(let i=0;i<taxWithGst.length;i++){
            taxWithGst[i].style.display="inline";
            originalTax[i].style.display="none";
        }
    }else{
        taxLabel.innerText="Display total before tax";
        for(let i=0;i<taxWithGst.length;i++){
            taxWithGst[i].style.display="none";
            originalTax[i].style.display="inline";
        }
    }
});

