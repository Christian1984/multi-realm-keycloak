import { AuthProvider, useAuth } from "react-oidc-context";

const oidcConfig = {
  authority: "http://localhost:8081/realms/public",
  client_id: "public-client",
  redirect_uri: `${window.location.origin}${window.location.pathname}`,
};

function App() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        Hello {auth.user?.profile.sub}{" "}
        <button
          onClick={async () => {
            await auth.removeUser();
            await auth.signoutRedirect({
              post_logout_redirect_uri: oidcConfig.redirect_uri,
            });
          }}
        >
          Log out
        </button>
      </div>
    );
  }

  return <button onClick={() => void auth.signinRedirect()}>Log in</button>;
}

const AuthWrapper = () => (
  <AuthProvider {...oidcConfig}>
    <App />
  </AuthProvider>
);

export default AuthWrapper;
