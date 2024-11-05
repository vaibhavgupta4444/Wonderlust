let select=document.querySelector("#category");
for(let i=0;i<select.length;i++){
    if(select[i].value===select.value){
        select[i].selected=true;
    }
}