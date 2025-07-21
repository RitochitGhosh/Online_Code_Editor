"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const useConvexUser = ({ userId }: { userId: string }) => {
    const user = useQuery(api.users.getUser, { userId });

    return user;
};
