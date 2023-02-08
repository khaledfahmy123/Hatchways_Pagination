import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React, {useState, useEffect} from "react";
import blogs from "../data/blogs.json";

const PAGE_SIZES = [15, 25, 50, 100];

function BlogList() {
  const posts = blogs.posts;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [currentPaginationData, setCurrentPaginationData] = useState(posts.slice(0, pageSize));

  const maxPage = Math.ceil(blogs.posts.length/pageSize)

  useEffect(()=>{
    
    // sync content with page changes and page size

    let startSlice = (currentPage - 1) * pageSize;
    let endSlice = currentPage  * pageSize;
    setCurrentPaginationData(posts.slice(startSlice, endSlice));

  }, [currentPage, pageSize])

  const handlePageChange = (step) => {
    // buttons' click functions
    setCurrentPage(prev => {
      let res = prev + step;
      if( res < 1) return 1
      else if( res > maxPage) return maxPage
      else return res
    });
  }


  const updateRowsPerPage = (size) => {
    setCurrentPage(1);
    setPageSize(size);
  };
  const updatePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Pagination
        

        totalCount={blogs.posts.length}
        
        pageSizeOptions={PAGE_SIZES}
        onPageChange={updatePage}
        onPageSizeOptionChange={updateRowsPerPage}

        {...{currentPage, handlePageChange, pageSize, maxPage}}
      />
      <ul
        // Do not modify the aria-label below, it is used for Hatchways automation.
        aria-label="blog list"
      >
        {currentPaginationData.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
            featureImage={blog.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
