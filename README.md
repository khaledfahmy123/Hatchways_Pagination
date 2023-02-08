
# edits made
### - Blog posts component edits
i just added three main states:
---------------------------------------------------
|State | what it does|
|---------------| ---------------------|
|*currentPage* | monitors page changes and saves the current active page to be later passed down to the children|
|*pageSize* | encounters how many rows per page take it's value when the user chooses an option from the selector|
|*currentPaginationData* | it deals with the content that would be displayed in the current active page by slicing the whole posts into chunks|

Here is the code: 
```jsx
  const posts = blogs.posts;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [currentPaginationData, setCurrentPaginationData] = useState(posts.slice(0, pageSize));

```

then used *useEffect* to handle changes in the content when the page changes 

```jsx
  useEffect(()=>{
    
    // sync content with page changes and page size

    let startSlice = (currentPage - 1) * pageSize;
    let endSlice = currentPage  * pageSize;
    setCurrentPaginationData(posts.slice(startSlice, endSlice));

  }, [currentPage, pageSize])
  
```

lastly i added the *handlePageChange()* functions for the buttons to keep page number in the limit specified (it disables the button when reaches 1 or max page but just in case :)

```jsx
  const handlePageChange = (step) => {
    // buttons' click functions
    setCurrentPage(prev => {
      let res = prev + step;
      if( res < 1) return 1
      else if( res > maxPage) return maxPage
      else return res
    });
  }
```


### - Custom hook logic (usePagination)

it takes the current page and subtracts 1 then compare it with 1 to detect if it has a left sibling that is not 1 to decide whether to add the 3 dots at the beginning or not

reverse this approach and you will get the logic for the last 3 dots

```jsx

function  usePagination({currentPage, maxPage }) {

	let  temp = [];

	let  min = (currentPage == maxPage && maxPage != 1) ? maxPage -2 : Math.max(1, currentPage-1);
	let  max = Math.min(min+2, maxPage);

	for(var  i = min; i <= max; i++) temp.push(i)

	if(temp[0] > 1){ temp.unshift(1, DOTS); }
	
	if(temp.at(-1) < maxPage){ temp.push(DOTS, maxPage); }

	return  temp;
}
```

### - Pagination component
i just pass down the function **handlePageChange()** to the buttons on click functions and call the hook **usePagination()** nothing much

```jsx
const  paginationRange = usePagination({
	currentPage,
	maxPage,
});

const  onNext = () => {
	handlePageChange(1);
};

const  onPrevious = () => {
	handlePageChange(-1);
};
```
