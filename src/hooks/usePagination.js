import { useState } from "react";

export const DOTS = "...";

function usePagination({currentPage, maxPage }) {
  
  let temp = [];

  let min = (currentPage == maxPage && maxPage != 1) ? maxPage -2 : Math.max(1, currentPage-1);
  let max = Math.min(min+2, maxPage);
  for(var i = min; i <= max; i++) temp.push(i)
  
  if(temp[0] > 1){
    temp.unshift(1, DOTS);
  }
  if(temp.at(-1) < maxPage){
    temp.push(DOTS, maxPage);
  }


  return temp;
}

export default usePagination;
