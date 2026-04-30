import React, { Suspense } from 'react'

const UserDetailsContent = async ({ params } : {params:Promise<{id:string}>}) => {
    const {id} = await params
    return (
        <div>
            User Details {id}
        </div>
    )
}

const UserDetails = ({ params } : {params:Promise<{id:string}>}) => {
    return (
        <Suspense fallback={<div>Loading user details...</div>}>
            <UserDetailsContent params={params} />
        </Suspense>
    )
}

export default UserDetails
