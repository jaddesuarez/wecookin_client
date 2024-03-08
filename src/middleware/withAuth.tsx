import { AuthContext } from "@/context/auth.context";
import Loader from "@/ui/components/Loader/Loader";
import { useRouter } from "next/router";
import { useContext, useEffect, FC } from "react";

const withAuth = (WrappedComponent: FC) => {
  return (props: any) => {
    const { user, isLoading } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !user) {
        router.push("/login");
      }
    }, [user, isLoading, router]);

    if (isLoading) return <Loader />;

    if (!user) return null;

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
