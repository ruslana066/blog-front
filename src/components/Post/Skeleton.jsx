import React from 'react'
import { Skeleton } from '@mui/material'
import { Stack } from '@mui/material'

const PostSkeleton = () => {
    return (
        <div className='skeleton'>
            <Stack spacing={1}>
                <Skeleton variant='rounded' width='100%' height={300} animation="wave"/>
                    <div className='skeleton-info' >
                        <div className='skeleton-user' >
                            <Skeleton variant='circular' width={40} height={40} style={{ marginRight: 10 }} animation="wave" />
                            <div>
                                <Skeleton variant='text' width={60} height={20} animation="wave" />
                                <Skeleton variant='text' width={100} height={15} animation="wave" />
                            </div>
                        </div>
                        <div className='skeleton-bottom'>
                            <Skeleton variant='text' width='80%' height={60} animation="wave" />
                            <div className='tags'>
                                <Skeleton variant='text' width={40} height={20} animation="wave" />
                                <Skeleton variant='text' width={40} height={20} animation="wave" />
                                <Skeleton variant='text' width={40} height={20} animation="wave" />
                            </div>
                        </div>
                    </div>
           
            </Stack>
        </div>
    )
}

export default PostSkeleton
