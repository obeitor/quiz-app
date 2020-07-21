import React from "react";

export default function FinishPage({
  goHome,
  goBackToQuiz,
  total = 0,
  answered = 0,
  timer = 0,
  endTimer,
  submitStatus
}) {
  return (
    <>
                <div className='row h-100 px-5'>
                <div className='col-sm-6 m-auto py-2 card shadow text-center'>
                    <div className='text-muted p-1'>{submitStatus!=='NOT-SUBMITTED' ? 'This quiz has ended!':'You have '+formatDuration(timer,true)+' left'}</div>
                    {timer<=0 ? <></>:<div className='text-warning p-2'>You have answered {answered} out of {total} questions.</div>}
                    <div className='p-3 my-1 row'>
                        {
                            submitStatus==='DONE' ? 
                            <button className='btn btn-secondary btn-block' onClick={goHome}><em className='fa fa-home'></em> Quiz Home</button> :
                            <>
                                <button className='btn btn-light col-sm-5' onClick={goBackToQuiz} disabled={submitStatus==='READY'}><em className='fa fa-reply'></em> RETURN</button>
                                <div className='col-sm-2'></div>
                                <button className='btn btn-danger col-sm-5' 
                                    onClick={endTimer} disabled={submitStatus==='READY'}>
                                    {submitStatus==='READY' ?
                                        <span className='spinner-border spinner-border-sm'></span> :
                                        <em className='fa fa-upload'></em>
                                    }
                                    &nbsp;SUBMIT
                                </button>
                            </>
                        }  
                    </div>
                </div>
                </div>
                </>
  );
}
