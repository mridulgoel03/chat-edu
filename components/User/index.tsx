import React from 'react';

import NoUserFound from "@/components/User/NoUserFound";
import Container from "@/components/Utilities/Container";
import UserDisplay from "@/components/User/UserDisplay";

import useUser from "@/hooks/queries/user/useUser";

import {User as UserType} from "@/types/User";
import Loading from "@/components/Utilities/Loading";

interface Props {
    userId: UserType["id"]
}

const User: React.FC<Props> = ({ userId }) => {

    const { userData, loading } = useUser(userId);

    return (
        <Container>
            <Loading 
                loading={loading}
            >
                {
                    userData ? (
                        <UserDisplay
                            user={userData}
                        />
                    ) : (
                        <NoUserFound />
                    )
                }
            </Loading>
        </Container>
    );
};

export default User;
