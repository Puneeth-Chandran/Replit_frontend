import React from 'react';
import { useGetUserBlogQuery } from '../../redux/api/blogApi';

const Blog = () => {

const {data, error, isLoading} = useGetUserBlogQuery();    
console.log(data);

  return (
    <>
    <div className="page-header page-header-big text-center" style={{backgroundImage: "url(/assets/images/banners/belcab/banners/blog3.png)"}}>
        		<div className="container">
        			<h1 className="page-title text-white">Blogs<span>Sample Text</span></h1>
        		</div>
        	</div>

            <div className="page-content">
                <div className="container">

                    <div className="entry-container mt-4">
                        {data?.blogs?.map((blog) => (
                            <div className="entry-item col-sm-6 col-lg-4" key={blog?._id}>
                            <article className="entry entry-mask">
                                <figure className="entry-media">
                                    <a href="single.html">
                                        <img src={blog?.blogImage} alt="image desc"/>
                                    </a>
                                </figure>

                                <div className="entry-body">
                                    <div className="entry-meta text-dark">
                                        {new Date(blog?.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                    </div>

                                    <h2 className="entry-title text-dark">
                                        <a href="/blog">{blog?.title} </a>
                                    </h2>

                                    <div className="entry-cats text-dark">
                                        {blog?.description}
                                    </div>
                                </div>
                            </article>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            </>
  )
}

export default Blog