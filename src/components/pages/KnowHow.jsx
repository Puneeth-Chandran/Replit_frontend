import React from 'react'
import { useGetUserKnowQuery } from '../../redux/api/knowApi';

const KnowHow = () => {

    const {data, isLoading, error} = useGetUserKnowQuery();

  return (
    <div className="row justify-content-center">
                        {data?.know?.map((know) => (
                            <div className="col-sm-6 col-md-3 d-flex" key={know?.index}>
                			<article className="entry entry-grid p-2 h-80 w-100" style={{border: "1px solid #00286c", borderRadius: "15px", backgroundColor: "#e5eaf3"}}>
                				<figure className="entry-media mt-1">
                					<a href="single.html">
                						<img src={know?.knowImage} alt="image desc"/>
                					</a>
                				</figure>

                				<div className="entry-body text-center d-flex flex-column">

                					<h2 className="entry-title">
                						{know?.title}
                					</h2>

                					<div className="entry-content fs-4">
                						<p>{know?.description}</p>
                						<a href={know?.knowFile} 
										className="read-more"
										target="_blank"
                                        rel="noopener noreferrer">
										View
										</a>
                					</div>
                				</div>
                			</article>
                		</div>
                        ))}
                		</div>
  )
}

export default KnowHow