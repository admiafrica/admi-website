import { useNavigate, useRouteError } from '@remix-run/react';

type RouteError = {
  statusText?: string;
  message?: string;
};

export const ErrorPage = () => {
  const error = useRouteError() as RouteError | null;
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // to the previous page
  };

  return (
    <div id="error-page" style={errorContentStyle}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message || 'Unknown error'}</i>
      </p>
      <button onClick={handleGoBack} color="blue">
        Go Back
      </button>
    </div>
  );
};

const errorContentStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 20px',
  color: 'black',
  backgroundColor: '#f8f9fa',
  borderBottom: '1px solid #dee2e6',
  height: '100vh',
};
