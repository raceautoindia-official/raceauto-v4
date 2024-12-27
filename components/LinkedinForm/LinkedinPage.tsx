'use client'
 
import React from 'react'
import SubscribeComponent from './SubscribeForm'
import './linkedin.css'

const LinkedinPage = () => {
  return (
    <>
    
    <h4 style={{ fontSize: "1.4rem" }} className="text-center my-3"><b>Register your email, and we'll keep you informed about our latest content and events. Unsubscribe anytime.</b></h4>
                    <div className="row event_subscribe">
                        <div className="col-md-4">
                            <div className="linkedin-image-container">
                                <a href='https://www.linkedin.com/company/race-auto-india/' target="_blank" rel="noreferrer" style={{ color: "inherit" }}>
                                    <img src='/images/LinkedIn-Logo.wine.png' height={150}  className="linkedin-cropped-image" />
                                </a>
                            </div>
                        </div>
                        {window.innerWidth < 600 && <hr />}
                        <div className="col-md-8">
                            <SubscribeComponent />
                        </div>
                    </div>
                    </>
  )
}

export default LinkedinPage